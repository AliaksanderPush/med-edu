import { Module } from '@nestjs/common';
import { SlotService } from './slot.service';
import { PrismaService } from 'src/core/prisma/prisma.service';
import { SlotController } from './slot.controller';
import { HelperService } from 'src/helper/helper.service';
import { IncompleteFeedbackModule } from 'src/incomplete-feedback/incomplete-feedback.module';

@Module({
  providers: [SlotService, PrismaService, IncompleteFeedbackModule, HelperService],
  controllers: [SlotController],
  exports: [SlotService],
})
export class SlotModule {}
