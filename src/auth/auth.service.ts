import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { TokensService } from 'src/tokens/tokens.service';
import { VerificationService } from 'src/verification/verification.service';
import { ConfirmEmailDto } from './dto/ confirmEmail.dto';
import { IJwtTokens } from 'src/tokens/dto/tokens.dto';
import { User } from '@prisma/client';
import { UserService } from 'src/user/user.service';
import { AuthExceptions } from 'src/core/constants/auth.constants';
import { RegistrDto } from './dto/regisrtration.dto';
import { VerifCodeDto } from './dto/confirmCode.dto';
import { LoginDto } from './dto/login.dto';
import { HelperService } from 'src/helper/helper.service';
import { IConfirmEmail } from './inteface/IConfirmEmail.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly tokensService: TokensService,
    private readonly verificationService: VerificationService,
    private readonly userService: UserService,
    private readonly helperService: HelperService,
  ) {}

  async verifyEmail(dto: ConfirmEmailDto) {
    await this.userService.getUserByEmailThrow(dto.email);

    return this.createOrUpdateVerifiedModel(dto);
  }

  async forgotPassword(dto: ConfirmEmailDto) {
    const user = await this.userService.getUserByEmail(dto.email);
    return this.createOrUpdateVerifiedModel({
      ...dto,
      role: user.role,
    });
  }

  async createOrUpdateVerifiedModel(dto: IConfirmEmail) {
    const candidate = await this.verificationService.getCandidateByEmail(dto.email);
    if (candidate) {
      return await this.verificationService.updateCodeOfCandidate(dto);
    }
    return await this.verificationService.createCandidate(dto);
  }

  async resetPassword(dto: RegistrDto) {
    await this.userService.getUserByEmail(dto.email);
    const candidate = await this.verificationService.getCandByEmailAndExpDate(dto.email);
    if (!candidate) {
      throw new HttpException(AuthExceptions.TIME_HAS_EZPIRIED, HttpStatus.BAD_REQUEST);
    }
    if (!candidate.isVerify) {
      throw new HttpException(AuthExceptions.EMAIL_NOT_CONFIRM, HttpStatus.BAD_REQUEST);
    }
    return this.userService.changePassword(dto);
  }

  async verifyCode(dto: VerifCodeDto) {
    const candidate = await this.verificationService.getCandidateByEmail(dto.email);
    if (!candidate) {
      throw new HttpException(AuthExceptions.USER_NOT_FOUND, HttpStatus.BAD_REQUEST);
    }
    const result = await this.verificationService.verifyCode({
      dto,
      candidate,
    });
    if (!result) {
      throw new HttpException(AuthExceptions.CODE_NOT_CORRECT, HttpStatus.BAD_REQUEST);
    }
  }

  async registration(dto: RegistrDto): Promise<IJwtTokens> {
    await this.userService.getUserByEmailThrow(dto.email);
    const candidate = await this.verificationService.getCandidateByEmail(dto.email);

    if (!candidate) {
      throw new HttpException(AuthExceptions.USER_NOT_FOUND, HttpStatus.BAD_REQUEST);
    }
    return await this.userService.createNewUser({ dto, candidate });
  }

  async userLogin(loginDto: LoginDto) {
    const user = await this.userService.getUserByEmail(loginDto.email);
    const result = await this.helperService.compareHashData(loginDto.password, user.password);
    if (!result) {
      throw new HttpException(AuthExceptions.WRONG_PASSWORD, HttpStatus.BAD_REQUEST);
    }

    return this.loginUser(user);
  }

  async loginUser(user: User): Promise<IJwtTokens> {
    const tokens = await this.tokensService.generateTokens(user.email, user.id, user.role);
    await this.tokensService.saveToken(user.id, tokens.refreshToken);
    return tokens;
  }

  async refreshTokens(refreshToken: string): Promise<IJwtTokens> {
    const token = await this.tokensService.findToken(refreshToken);
    const userData = await this.tokensService.validateTokens(refreshToken);
    if (!userData || !token) {
      throw new HttpException(AuthExceptions.TOKEN_FAULT, HttpStatus.FORBIDDEN);
    }
    await this.userService.getUserByEmail(userData.email);
    const { email, id, role } = userData;
    const tokens = await this.tokensService.generateTokens(email, id, role);
    await this.tokensService.saveToken(id, tokens.refreshToken);
    return tokens;
  }
}
