import { QuestionFieldType } from '@prisma/client';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class CreateQuastionDto {
  @IsNotEmpty()
  @IsString()
  question: string;

  @IsEnum(QuestionFieldType)
  type: QuestionFieldType;
}
