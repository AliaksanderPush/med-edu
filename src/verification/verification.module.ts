import { Module } from '@nestjs/common';
import { VerificationService } from './verification.service';
import { HelperService } from 'src/helper/helper.service';
import { PrismaService } from 'src/core/prisma/prisma.service';

@Module({
  providers: [VerificationService, PrismaService, HelperService],
  exports: [VerificationService],
})
export class VerificationModule {}
