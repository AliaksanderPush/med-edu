import { Module } from '@nestjs/common';
import { MailReportController } from './mail-report.controller';
import { MailReportService } from './mail-report.service';
import { FeedbackService } from 'src/feedback/feedback.service';
import { PrismaService } from 'src/core/prisma/prisma.service';
import { SlotService } from 'src/slot/slot.service';
import { QuastionService } from 'src/question/question.service';

@Module({
  controllers: [MailReportController],
  providers: [MailReportService, FeedbackService, PrismaService, SlotService, QuastionService, QuastionService],
  exports: [MailReportService],
})
export class MailReportModule {}
