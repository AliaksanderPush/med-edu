import { Module } from '@nestjs/common';
import { IncompleteFeedbackService } from './incomplete-feedback.service';
import { PrismaService } from 'src/core/prisma/prisma.service';

@Module({
  providers: [IncompleteFeedbackService, PrismaService],
  exports: [IncompleteFeedbackService],
})
export class IncompleteFeedbackModule {}
