import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'change file test 1, 2, 3, 4';
  }
}
