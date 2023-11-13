import {
  ExecutionContext,
  UnsupportedMediaTypeException,
} from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { MethodNegotiationInterceptor } from '../../src/method-negotiation.interceptor';

describe('MethodNegotiationInterceptor', () => {
  let interceptor: MethodNegotiationInterceptor;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MethodNegotiationInterceptor],
    }).compile();

    interceptor = module.get<MethodNegotiationInterceptor>(
      MethodNegotiationInterceptor,
    );
  });

  it('should allow GET requests', () => {
    const context = {
      switchToHttp: () => ({
        getRequest: () => ({ method: 'GET' }),
      }),
    };

    expect(() =>
      interceptor.intercept(context as ExecutionContext, {
        handle: () => 'test',
      }),
    ).not.toThrow();
  });

  it('should throw UnsupportedMediaTypeException for non-GET requests', () => {
    const context = {
      switchToHttp: () => ({
        getRequest: () => ({ method: 'POST' }),
      }),
    };

    expect(() =>
      interceptor.intercept(context as ExecutionContext, {
        handle: () => 'test',
      }),
    ).toThrow(UnsupportedMediaTypeException);
  });
});
