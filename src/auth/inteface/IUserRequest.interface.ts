import { User } from '@prisma/client';
import { Request } from 'express';

export interface IUserRequest extends Request {
  user: User;
}
