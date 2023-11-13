import { Injectable, MethodNotAllowedException } from '@nestjs/common';

@Injectable()
export class MethodNegotiationInterceptor {
  intercept(context, next) {
    const request = context.switchToHttp().getRequest();
    if (request.method !== 'GET') {
      throw new MethodNotAllowedException();
    }
    return next.handle();
  }
}
