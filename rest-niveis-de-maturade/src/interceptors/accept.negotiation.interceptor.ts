import { NotAcceptableException } from '@nestjs/common';

const ACCEPT_WHITE_LIST = ['application/vnd.project.v1+json'];

export class AcceptNegotiationInterceptor {
  intercept(context, next) {
    const request = context.switchToHttp().getRequest();
    console.log(!ACCEPT_WHITE_LIST.includes(request.headers.accept));
    if (!ACCEPT_WHITE_LIST.includes(request.headers.accept)) {
      throw new NotAcceptableException({
        message: `Accept not supported. Please use one of the following: ${ACCEPT_WHITE_LIST.join(
          ', ',
        )}.`,
        status: 406,
      });
    }
    return next.handle();
  }
}
