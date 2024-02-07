import { Injectable } from '@nestjs/common';
import { CreateFeedbackDto } from './dto/create-feedback.dto';
import { PrismaService } from 'src/core/prisma/prisma.service';
import { QuestionFieldType } from '@prisma/client';
import { feedBackInfoSelect } from './constants/constants.selector';
import { SlotService } from 'src/slot/slot.service';

@Injectable()
export class FeedbackService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly slotService: SlotService,
  ) {}

  async createFeedback(id: string, dto: CreateFeedbackDto) {
    const { sessionId } = dto;

    const newfeedBack = await this.prismaService.feedBack.create({
      data: {
        user: {
          connect: { id },
        },
        session: {
          connect: { id: sessionId },
        },
      },
    });

    const myAllanswers = await Promise.all(
      dto.answers.map((answ) => {
        const { type, id, answer } = answ;
        return this.prismaService.answer.create({
          data: {
            feedBack: {
              connect: { id: newfeedBack.id },
            },
            question: {
              connect: { id },
            },
            answerStr: type === QuestionFieldType.STRING ? (answer as string) : null,
            answerBool: type === QuestionFieldType.BOOLEAN ? (answer as boolean) : null,
            answerNum: type === QuestionFieldType.NUMBER ? (answer as number) : null,
          },
        });
      }),
    );

    const answers = await this.prismaService.feedBack.update({
      where: {
        id: newfeedBack.id,
      },
      data: {
        answer: {
          set: [].concat(myAllanswers),
        },
      },
      select: {
        ...feedBackInfoSelect.generalData,
      },
    });

    await this.slotService.removeIncomFeedBack(id, sessionId);
    return answers;
  }

  async getAllFeedBacksBySession(sessionId: string) {
    const answers = await this.prismaService.feedBack.findMany({
      where: {
        sessionId,
      },
      select: {
        answer: {
          select: {
            answerBool: true,
            answerNum: true,
            answerStr: true,
            question: {
              select: {
                id: true,
                type: true,
                question: true,
              },
            },
          },
        },
      },
    });

    return answers.map((answ) => {
      const questions = 'cloe7ocvv0000evx00cyyxtcm';
      return answ.answer.filter((item) => item.question.id === questions);
    });
  }
}
