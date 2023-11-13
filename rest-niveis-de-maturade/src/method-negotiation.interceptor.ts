import { Injectable, MethodNotAllowedException } from '@nestjs/common';

const METHOD_WHITE_LIST = ['GET', 'POST', 'PUT'];

@Injectable()
export class MethodNegotiationInterceptor {
  intercept(context, next) {
    const request = context.switchToHttp().getRequest();
    if (!METHOD_WHITE_LIST.includes(request.method)) {
      throw new MethodNotAllowedException();
    }
    return next.handle();
  }
}
