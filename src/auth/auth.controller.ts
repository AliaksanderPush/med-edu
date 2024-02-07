import { AuthService } from './auth.service';
import { VerifCodeDto } from './dto/confirmCode.dto';
import { RegistrDto } from './dto/regisrtration.dto';
import { LoginDto } from './dto/login.dto';
import { IJwtTokens } from 'src/tokens/dto/tokens.dto';
import { TokensService } from 'src/tokens/tokens.service';
import { AccessTokenGuard } from './guards/access-token.guard';
import { RefreshTokenGuard } from './guards/refresh-token.guard';
import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Post, Query, Req, UseGuards } from '@nestjs/common';
import { RequestWithUser } from 'src/core/interfaces/user-response.inteface';
import { ConfirmEmailDto } from './dto/ confirmEmail.dto';
import { RoleGuard } from 'src/core/guards/user-role.guard';
import { Role } from '@prisma/client';
import { DeleteUserAcccountDto } from './dto/delete-user.dto';
import { UserService } from 'src/user/user.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly tokensService: TokensService,
    private readonly userService: UserService,
  ) {}

  @Post('/verify-email')
  async verifyEmil(@Body() dto: ConfirmEmailDto) {
    return this.authService.verifyEmail(dto);
  }

  @Post('/forgot-password')
  async forgotPassword(@Body() dto: ConfirmEmailDto) {
    return this.authService.forgotPassword(dto);
  }

  @Post('/reset-password')
  async resetPassword(@Body() dto: RegistrDto) {
    return this.authService.resetPassword(dto);
  }

  @Post('/verify-code')
  async verifyCode(@Body() dto: VerifCodeDto) {
    await this.authService.verifyCode(dto);
    return {
      status: 'ok',
    };
  }

  @Post('/registration')
  @HttpCode(HttpStatus.CREATED)
  async registration(@Body() dto: RegistrDto): Promise<IJwtTokens> {
    return this.authService.registration(dto);
  }

  @Post('/login')
  async login(@Body() loginDto: LoginDto): Promise<IJwtTokens> {
    return this.authService.userLogin(loginDto);
  }

  @Get('/logout')
  @UseGuards(AccessTokenGuard)
  async logoutUser(@Req() { user }: RequestWithUser) {
    await this.tokensService.removeToken(user.id);
    return {
      status: 'ok',
    };
  }

  @Get('/refresh')
  @UseGuards(RefreshTokenGuard)
  async refreshTokens(@Req() { user }: RequestWithUser) {
    return this.authService.refreshTokens(user.refreshToken);
  }

  @Delete('/delete')
  @UseGuards(RoleGuard([Role.ADMIN]))
  async deleteUserAccountById(@Query() { id }: DeleteUserAcccountDto) {
    await this.userService.deleteUser(id);
    return {
      status: 'ok',
    };
  }

  @Delete('/delete-me')
  @UseGuards(RoleGuard([Role.DOCTOR, Role.MANAGER, Role.STUDENT]))
  @UseGuards(AccessTokenGuard)
  async deleteMe(@Req() { user }: RequestWithUser) {
    await this.userService.deleteUser(user.id);
    return {
      status: 'ok',
    };
  }
}
