import { BcryptAdapter } from '@infra/adapters';
import { env } from '@main/config/env';

export const makeBcryptAdapter = (): BcryptAdapter => {
  return new BcryptAdapter(Number(env.secrets.saltRounds));
};
