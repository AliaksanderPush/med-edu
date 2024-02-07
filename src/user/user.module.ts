import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TokensService } from 'src/tokens/tokens.service';
import { JwtService } from '@nestjs/jwt';
import { HelperService } from 'src/helper/helper.service';
import { PrismaService } from 'src/core/prisma/prisma.service';
import { UserinfoService } from 'src/userinfo/userinfo.service';

@Module({
  controllers: [UserController],
  exports: [UserService],
  providers: [UserService, TokensService, PrismaService, JwtService, HelperService, UserinfoService],
})
export class UserModule {}
