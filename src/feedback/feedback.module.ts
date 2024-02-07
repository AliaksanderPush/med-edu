import { Module } from '@nestjs/common';
import { FeedbackController } from './feedback.controller';
import { FeedbackService } from './feedback.service';
import { PrismaService } from 'src/core/prisma/prisma.service';
import { SlotService } from 'src/slot/slot.service';

@Module({
  controllers: [FeedbackController],
  providers: [FeedbackService, PrismaService, SlotService],
  exports: [FeedbackService],
})
export class FeedbackModule {}
