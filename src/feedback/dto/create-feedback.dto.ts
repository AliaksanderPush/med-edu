import { QuestionFieldType } from '@prisma/client';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  Validate,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

class AnswerDto {
  id: string;
  answer: string | number | boolean;
  type: QuestionFieldType;
}

@ValidatorConstraint({ name: 'customText', async: true })
export class CustomPasswordValidate implements ValidatorConstraintInterface {
  async validate(data: AnswerDto[]) {
    if (!data.length) {
      return false;
    }
    const res = await Promise.all(
      data.map((item) => {
        switch (item.type) {
          case QuestionFieldType.STRING:
            return typeof item.answer === 'string' && item.answer.length < 100;
          case QuestionFieldType.NUMBER:
            return typeof item.answer === 'number' && item.answer < 6;
          case QuestionFieldType.BOOLEAN:
            return typeof item.answer === 'boolean';
          default:
            return false;
        }
      }),
    );

    return res.every((b: boolean) => b);
  }

  defaultMessage() {
    return 'Wrong answers data!';
  }
}

export class CreateFeedbackDto {
  @IsNotEmpty()
  @IsString()
  sessionId: string;

  @IsOptional()
  @Validate(CustomPasswordValidate)
  answers?: [{ id: string; answer: string | number | boolean; type: QuestionFieldType }];
}
