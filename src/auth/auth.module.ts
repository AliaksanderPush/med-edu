import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TokensService } from 'src/tokens/tokens.service';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { AccessTokenStrategy } from './strategies/accessToken.strategy';
import { RefreshTokenStrategy } from './strategies/refreshToken.strategy';
import { ConfigService } from '@nestjs/config';
import { VerificationService } from 'src/verification/verification.service';
import { HelperService } from 'src/helper/helper.service';
import { PrismaService } from 'src/core/prisma/prisma.service';
import { UserinfoService } from 'src/userinfo/userinfo.service';

@Module({
  providers: [
    AuthService,
    UserService,
    TokensService,
    UserinfoService,
    PrismaService,
    HelperService,
    JwtService,
    AccessTokenStrategy,
    RefreshTokenStrategy,
    ConfigService,
    VerificationService,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
