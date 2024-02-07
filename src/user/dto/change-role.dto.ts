import { Role } from '@prisma/client';
import { IsEnum, IsNotEmpty } from 'class-validator';

export class ChangeRoleDto {
  @IsEnum(Role)
  role: Role;

  @IsNotEmpty()
  id: string;
}
