import { BcryptUseCase } from '@domain/use-cases';
import { BcryptAdapter, makeBcryptAdapter } from '@infra/adapters';

export class BcryptService implements BcryptUseCase {
  constructor(private readonly bcryptAdapter: BcryptAdapter) {}

  async hash(content: string): Promise<string> {
    return await this.bcryptAdapter.hash(content);
  }
  async compare(plainText: string, hash: string): Promise<boolean> {
    return await this.bcryptAdapter.compare(plainText, hash);
  }
}

export const makeBcryptService = (): BcryptService => {
  return new BcryptService(makeBcryptAdapter());
};
