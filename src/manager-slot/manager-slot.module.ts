import { Module } from '@nestjs/common';
import { ManagerSlotController } from './manager-slot.controller';
import { ManagerSlotService } from './manager-slot.service';
import { UserService } from 'src/user/user.service';
import { PrismaService } from 'src/core/prisma/prisma.service';
import { HelperService } from 'src/helper/helper.service';
import { UserinfoService } from 'src/userinfo/userinfo.service';
import { TokensService } from 'src/tokens/tokens.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [ManagerSlotController],
  providers: [
    ManagerSlotService,
    UserService,
    PrismaService,
    HelperService,
    UserinfoService,
    TokensService,
    JwtService,
  ],
  exports: [ManagerSlotService],
})
export class ManagerSlotModule {}
