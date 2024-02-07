import { Role, UserStatus } from '@prisma/client';
import { IsEmail, IsEnum, IsNotEmpty, IsOptional, Length } from 'class-validator';

export class UpdateUserDto {
  @IsNotEmpty()
  id: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @Length(2, 30)
  firstName: string;

  @IsEnum(UserStatus)
  status: UserStatus;

  @IsEnum(Role)
  role: Role;

  @Length(2, 30)
  lastName: string;

  @Length(2, 30)
  hospital: string;

  @Length(2, 30)
  department: string;

  @IsOptional()
  @Length(2, 30)
  grade?: string;

  @IsOptional()
  @Length(1, 30)
  yearGroup?: string;
}
