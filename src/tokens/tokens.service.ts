import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IJwtTokens } from './dto/tokens.dto';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from 'src/core/prisma/prisma.service';
import { AuthExceptions } from 'src/core/constants/auth.constants';
import { IUserPayload } from 'src/user/interface/user-payload.interface';

@Injectable()
export class TokensService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}
  async generateTokens(email: string, id: string, role: string): Promise<IJwtTokens> {
    const payLoad = {
      email,
      role,
      id,
    };
    const accessToken = await this.jwtService.signAsync(payLoad, {
      secret: this.configService.getOrThrow('JWT_SECRET'),
      expiresIn: '25m',
    });

    const refreshToken = await this.jwtService.signAsync(payLoad, {
      secret: this.configService.getOrThrow('JWT_SECRET'),
      expiresIn: '15d',
    });

    return {
      accessToken,
      refreshToken,
    };
  }

  async validateTokens(token: string): Promise<IUserPayload> {
    return this.jwtService.verifyAsync(token, {
      secret: this.configService.getOrThrow('JWT_SECRET'),
    });
  }

  async saveToken(userId: string, refreshToken: string) {
    const searchToken = await this.prismaService.token.findUnique({
      where: { userId },
    });

    if (searchToken) {
      return this.prismaService.token.update({
        where: { userId },
        data: { refreshToken },
      });
    }

    return this.prismaService.token.create({
      data: {
        userId,
        refreshToken,
      },
    });
  }

  async removeToken(userId: string) {
    const token = this.prismaService.token.delete({
      where: { userId },
    });
    if (!token) {
      throw new HttpException(AuthExceptions.REFRESHTOKEN_NOT_FOUND, HttpStatus.BAD_REQUEST);
    }
  }

  async findToken(token: string) {
    return this.prismaService.token.findFirst({
      where: { refreshToken: token },
    });
  }
}
