import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator';

export class ConfirmEmailDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsOptional()
  isVeb?: boolean;
}
