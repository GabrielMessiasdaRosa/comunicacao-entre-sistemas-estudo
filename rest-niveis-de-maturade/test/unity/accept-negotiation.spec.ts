import { Test, TestingModule } from '@nestjs/testing';
import { AcceptNegotiationInterceptor } from '../../src/interceptors/accept.negotiation.interceptor';

describe('AcceptNegotiationInterceptor', () => {
  let interceptor: AcceptNegotiationInterceptor;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AcceptNegotiationInterceptor],
    }).compile();

    interceptor = module.get<AcceptNegotiationInterceptor>(
      AcceptNegotiationInterceptor,
    );
  });

  it('should allow if application/vnd.project.v1+json', () => {});
});
