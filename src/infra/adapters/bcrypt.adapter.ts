import { env } from '@main/config/env';
import { hashSync } from 'bcrypt';

export class BcryptAdapter {
  async adapt(content: string): Promise<string> {
    return hashSync(content, env.secrets.saltRounds);
  }
}

export const makeBcryptAdapter = (): BcryptAdapter => {
  return new BcryptAdapter();
};
