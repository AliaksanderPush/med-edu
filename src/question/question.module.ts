import { Module } from '@nestjs/common';
import { QuestionController } from './question.controller';
import { QuastionService } from './question.service';
import { PrismaService } from 'src/core/prisma/prisma.service';

@Module({
  controllers: [QuestionController],
  providers: [QuastionService, PrismaService],
  exports: [QuastionService],
})
export class QuestionModule {}
