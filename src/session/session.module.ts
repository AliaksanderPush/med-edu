import { Module } from '@nestjs/common';
import { SessionController } from './session.controller';
import { SessionService } from './session.service';
import { PrismaService } from 'src/core/prisma/prisma.service';
import { SlotService } from 'src/slot/slot.service';

@Module({
  controllers: [SessionController],
  providers: [SessionService, PrismaService, SlotService],
  exports: [SessionService],
})
export class SessionModule {}
