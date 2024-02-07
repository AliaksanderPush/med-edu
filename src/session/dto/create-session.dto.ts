import { SessionStatus } from '@prisma/client';
import { IsNotEmpty, Length, IsEnum } from 'class-validator';

export class CreateSessionDto {
  @IsNotEmpty()
  @Length(2, 50)
  title: string;

  @IsNotEmpty()
  @Length(2, 50)
  departmen: string;

  @IsNotEmpty()
  @Length(2, 400)
  description: string;

  @IsNotEmpty()
  @Length(2, 30)
  doctorName: string;

  @IsNotEmpty()
  limit: number;

  @IsEnum(SessionStatus)
  status: SessionStatus;

  @IsNotEmpty()
  startDate: Date;

  @IsNotEmpty()
  @Length(2, 50)
  location: string;

  @IsNotEmpty()
  duration: number;
}
