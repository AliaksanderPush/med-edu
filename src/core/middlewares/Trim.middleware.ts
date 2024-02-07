import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class TrimMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    this.trimRequestFields(req.body);
    next();
  }

  private trimRequestFields(data: unknown) {
    if (typeof data === 'object') {
      for (const key in data) {
        if (typeof data[key] === 'string') {
          data[key] = data[key].trim();
        } else if (typeof data[key] === 'object') {
          this.trimRequestFields(data[key]);
        }
      }
    }
  }
}
