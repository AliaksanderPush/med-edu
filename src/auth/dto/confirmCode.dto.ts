import { IsEmail, IsNotEmpty } from 'class-validator';

export class VerifCodeDto {
  @IsNotEmpty()
  code: number;

  @IsNotEmpty()
  @IsEmail()
  email: string;
}
