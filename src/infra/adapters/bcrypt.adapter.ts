import { env } from '@main/config/env';
import { compareSync, hashSync } from 'bcrypt';

export class BcryptAdapter {
  async hash(content: string): Promise<string> {
    return hashSync(content, Number(env.secrets.saltRounds));
  }

  async compare(plainText: string, hash: string): Promise<boolean> {
    return compareSync(plainText, hash);
  }
}

export const makeBcryptAdapter = (): BcryptAdapter => {
  return new BcryptAdapter();
};
