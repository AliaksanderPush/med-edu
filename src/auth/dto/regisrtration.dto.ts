import { SessionStatus } from '@prisma/client';
import { IsEmail, IsNotEmpty, Length } from 'class-validator';

export class RegistrDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @Length(3, 30)
  @IsNotEmpty()
  password: string;

  @Length(3, 30)
  @IsNotEmpty()
  confirmPassword: SessionStatus;
}
