import { GenerateTokenUseCase } from '@domain/use-cases';
import { makeTokenAdapter, TokenAdapter } from '@infra/adapters';

export class GenerateTokenService implements GenerateTokenUseCase {
  constructor(private readonly tokenAdapter: TokenAdapter) {}

  async perform(email: string): Promise<string> {
    return this.tokenAdapter.encode({ email });
  }
}

export const makeGenerateTokenService = (): GenerateTokenService => {
  return new GenerateTokenService(makeTokenAdapter());
};
