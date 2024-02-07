import { Request } from 'express';

export interface IReqWithOffsetLimit extends Request {
  offset?: string;
  limit?: string;
}
