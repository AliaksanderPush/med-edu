import { Injectable } from '@nestjs/common';
import { CreateQuastionDto } from './dto/create-question.dto';
import { PrismaService } from 'src/core/prisma/prisma.service';

@Injectable()
export class QuastionService {
  constructor(private readonly prismaService: PrismaService) {}

  async createQuestion(dto: CreateQuastionDto) {
    const { type, question } = dto;
    return await this.prismaService.question.create({
      data: {
        question,
        type,
      },
    });
  }

  async getAllQuestions() {
    return await this.prismaService.question.findMany({
      select: {
        id: true,
        type: true,
        question: true,
        answers: true,
      },
    });
  }

  async deleteQuestion(id: string) {
    return await this.prismaService.question.delete({
      where: { id },
    });
  }
}
