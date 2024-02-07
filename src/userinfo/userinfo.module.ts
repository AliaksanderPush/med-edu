import { Module } from '@nestjs/common';
import { UserinfoController } from './userinfo.controller';
import { UserinfoService } from './userinfo.service';
import { PrismaService } from 'src/core/prisma/prisma.service';

@Module({
  controllers: [UserinfoController],
  providers: [UserinfoService, PrismaService],
  exports: [UserinfoService],
})
export class UserinfoModule {}
