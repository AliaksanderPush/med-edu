import { HttpException, Injectable, NestMiddleware } from '@nestjs/common';
import { Response, NextFunction } from 'express';
import { IReqWithOffsetLimit } from './interfaces/IReqWithOffsetLimit';
import { ConvertOffsetLimitException } from './constants/exceptions.const';
import { MAX_TAKE } from './constants/constants';

@Injectable()
export class ConvertQueryToNumberMiddleware implements NestMiddleware {
  use(req: IReqWithOffsetLimit, res: Response, next: NextFunction) {
    let skipParam: string | number = req.query?.skip as string;
    let takeParam: string | number = req.query?.take as string;

    if (skipParam !== undefined) {
      const skip = +skipParam;

      if (Number.isNaN(skip)) {
        throw new HttpException(ConvertOffsetLimitException.INVALID_SKIP_FORMAT(skipParam), 400);
      }

      skipParam = skip;
    }

    if (takeParam !== undefined) {
      const take = +takeParam;

      if (Number.isNaN(take)) {
        throw new HttpException(ConvertOffsetLimitException.INVALID_TAKE_FORMAT(takeParam), 400);
      }

      takeParam = take <= MAX_TAKE ? take : MAX_TAKE;
    }

    req.query.skip = skipParam as unknown as string;
    req.query.take = (takeParam || 25) as unknown as string;
    next();
  }
}
