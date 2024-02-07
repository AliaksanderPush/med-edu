import { Injectable } from '@nestjs/common';
import { ConfirmEmailDto } from 'src/auth/dto/ confirmEmail.dto';
import { VerifCodeDto } from 'src/auth/dto/confirmCode.dto';
import { HelperService } from 'src/helper/helper.service';
import { Cron, CronExpression } from '@nestjs/schedule';
import { Role, Verification } from '@prisma/client';
import { PrismaService } from 'src/core/prisma/prisma.service';
import { Regexp } from './constants/regexp';

@Injectable()
export class VerificationService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly helperService: HelperService,
  ) {}

  async getCandidateByEmail(email: string): Promise<Verification | null> {
    const candidate = await this.prismaService.verification.findUnique({
      where: { email },
    });
    return candidate;
  }

  async getCandByEmailAndExpDate(email: string): Promise<Verification | null> {
    const currentDate = this.helperService.getCurrentDate();
    const candidate = await this.prismaService.verification.findFirst({
      where: { email, expirationDate: { gt: currentDate } },
    });
    return candidate;
  }

  async deleteCandidateByEmail(email: string): Promise<Verification | null> {
    const result = await this.prismaService.verification.delete({
      where: { email },
    });
    return result;
  }

  async createCandidate(data: ConfirmEmailDto): Promise<{ code: number }> {
    const code = this.helperService.generateSixRandomNumber();
    const currRole = this.defineRoleOfUser(data);
    const hashCode = await this.helperService.hashData(code.toString());
    const expirationDate = this.helperService.addOneHour();
    await this.prismaService.verification.create({
      data: {
        email: data.email,
        code: hashCode,
        role: currRole,
        expirationDate,
      },
    });
    return { code };
  }

  async updateCodeOfCandidate(data: ConfirmEmailDto): Promise<{ newCode: number }> {
    const newCode = this.helperService.generateSixRandomNumber();
    const hashCode = await this.helperService.hashData(newCode.toString());
    const expirationDate = this.helperService.addOneHour();
    await this.prismaService.verification.update({
      where: { email: data.email },
      data: { code: hashCode, expirationDate },
    });

    return { newCode };
  }

  private defineRoleOfUser(data: ConfirmEmailDto) {
    if (!!data.isVeb) {
      return Role.MANAGER;
    }
    const { email } = data;
    if (Regexp.email.test(email)) {
      return Role.DOCTOR;
    } else {
      return Role.STUDENT;
    }
  }

  async verifyCode({ dto, candidate }: { dto: VerifCodeDto; candidate: Verification }): Promise<boolean> {
    const result = await this.helperService.compareHashData(dto.code.toString(), candidate.code);

    if (!result) {
      return false;
    }

    await this.prismaService.verification.update({
      where: { email: dto.email },
      data: {
        isVerify: true,
      },
    });
    return true;
  }

  @Cron(CronExpression.EVERY_2_HOURS)
  async deleteVerifCode() {
    const currentDate = this.helperService.getCurrentDate();
    await this.prismaService.verification.deleteMany({
      where: {
        expirationDate: {
          lt: currentDate,
        },
      },
    });
  }
}
