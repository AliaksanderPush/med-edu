import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  private logger = new Logger('LoggingMiddleware');

  private isObjectNotEmpty(obj) {
    return Object.keys(obj).length > 0;
  }

  use(req: Request, res: Response, next: NextFunction) {
    const { method, originalUrl, query, body } = req;

    this.logger.log(`Incoming Request - Method: ${method}, URL: ${originalUrl}`);

    if (this.isObjectNotEmpty(query)) {
      this.logger.log('Query Parameters:', query);
    }

    if (this.isObjectNotEmpty(body)) {
      this.logger.log('Request Body:', body);
    }
    next();
  }
}
