import {
  ExecutionContext,
  UnsupportedMediaTypeException,
} from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { ContentTypeNegotiationInterceptor } from '../../src/interceptors/content-type-negotiation.interceptor';

describe('ContentTypeNegotiationInterceptor', () => {
  let interceptor: ContentTypeNegotiationInterceptor;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ContentTypeNegotiationInterceptor],
    }).compile();

    interceptor = module.get<ContentTypeNegotiationInterceptor>(
      ContentTypeNegotiationInterceptor,
    );
  });

  it('should allow requests with content-type application/json', () => {
    const context = {
      switchToHttp: () => ({
        getRequest: () => ({ headers: { 'content-type': 'application/json' } }),
      }),
    };

    expect(() =>
      interceptor.intercept(context as ExecutionContext, {
        handle: () => 'test',
      }),
    ).not.toThrow();
  });

  it('should throw UnsupportedMediaTypeException for requests with content-type other than application/json', () => {
    const context = {
      switchToHttp: () => ({
        getRequest: () => ({ headers: { 'content-type': 'text/plain' } }),
      }),
    };

    expect(() =>
      interceptor.intercept(context as ExecutionContext, {
        handle: () => 'test',
      }),
    ).toThrow(UnsupportedMediaTypeException);
  });
});
