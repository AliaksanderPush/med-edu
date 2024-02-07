import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { Milliseconds } from './constants/helper.constants';

@Injectable()
export class HelperService {
  generateSixRandomNumber(): number {
    return Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000;
  }

  async hashData(data: string): Promise<string> {
    return bcrypt.hash(data, 7);
  }

  async compareHashData(firstValue: string, secondHashValue: string): Promise<boolean> {
    return bcrypt.compare(firstValue, secondHashValue);
  }

  getCurrentDate() {
    return new Date();
  }

  addOneHour() {
    const currDate = new Date().getTime();
    return new Date(currDate + Milliseconds.TWO_HOUR_RATIO * Milliseconds.HOUR);
  }
}
