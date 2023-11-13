import { MethodNotAllowedException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { of } from 'rxjs';
import { MethodNegotiationInterceptor } from '../../src/interceptors/method-negotiation.interceptor';

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

  it('should be defined', () => {
    expect(interceptor).toBeDefined();
  });

  it('should throw MethodNotAllowedException if method is not in the white list', () => {
    const context = {
      switchToHttp: () => ({
        getRequest: () => ({ method: 'DELETE' }),
      }),
    };

    expect(() =>
      interceptor.intercept(context as any, { handle: () => of(null) }),
    ).toThrow(MethodNotAllowedException);
  });

  it('should not throw MethodNotAllowedException if method is in the white list', () => {
    const context = {
      switchToHttp: () => ({
        getRequest: () => ({ method: 'GET' }),
      }),
    };

    expect(() =>
      interceptor.intercept(context as any, { handle: () => of(null) }),
    ).not.toThrow(MethodNotAllowedException);
  });
});
