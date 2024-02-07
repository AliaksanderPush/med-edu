import { UserStatus } from '@prisma/client';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class UpdateUserStatusDo {
  @IsNotEmpty()
  @IsString()
  id: string;

  @IsEnum(UserStatus)
  status: UserStatus;
}
