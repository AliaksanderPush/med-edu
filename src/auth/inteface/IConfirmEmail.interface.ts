import { Role } from '@prisma/client';
import { ConfirmEmailDto } from '../dto/ confirmEmail.dto';

export interface IConfirmEmail extends ConfirmEmailDto {
  role?: Role;
}
