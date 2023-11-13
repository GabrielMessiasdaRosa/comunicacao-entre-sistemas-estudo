import { Injectable, UnsupportedMediaTypeException } from '@nestjs/common';

@Injectable()
export class ContentTypeNegotiationInterceptor {
  intercept(context, next) {
    const request = context.switchToHttp().getRequest();
    if (request.headers['content-type'] !== 'application/json') {
      throw new UnsupportedMediaTypeException();
    }
    return next.handle();
  }
}
