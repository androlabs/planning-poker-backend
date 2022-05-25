import { BcryptUseCase } from '@domain/use-cases';
import { BcryptAdapter, makeBcryptAdapter } from '@infra/adapters';

export class BcryptService implements BcryptUseCase {
  constructor(private readonly bcryptAdapter: BcryptAdapter) {}

  async perform(content: string): Promise<string> {
    return await this.bcryptAdapter.adapt(content);
  }
}

export const makeBcryptService = (): BcryptService => {
  return new BcryptService(makeBcryptAdapter());
};
