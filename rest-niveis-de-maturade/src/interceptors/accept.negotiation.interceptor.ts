import { UnsupportedMediaTypeException } from '@nestjs/common';

const ACCEPT_WHITE_LIST = ['application/vnd.project.v1+json'];

export class AcceptNegotiationInterceptor {
  intercept(context, next) {
    const request = context.switchToHttp().getRequest();
    console.log(!ACCEPT_WHITE_LIST.includes(request.headers.accept));
    if (!ACCEPT_WHITE_LIST.includes(request.headers.accept)) {
      throw new UnsupportedMediaTypeException();
    }
    return next.handle();
  }
}
