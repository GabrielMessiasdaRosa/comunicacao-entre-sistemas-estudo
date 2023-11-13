import { Injectable, UnsupportedMediaTypeException } from '@nestjs/common';

const CONTENT_TYPE_WHITE_LIST = ['application/json', 'application/hal_json'];

@Injectable()
export class ContentTypeNegotiationInterceptor {
  intercept(context, next) {
    const request = context.switchToHttp().getRequest();
    if (!CONTENT_TYPE_WHITE_LIST.includes(request.headers['content-type'])) {
      throw new UnsupportedMediaTypeException();
    }
    return next.handle();
  }
}
