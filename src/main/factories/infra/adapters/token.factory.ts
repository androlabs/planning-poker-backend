import { TokenAdapter } from "@infra/adapters";
import { env } from '@main/config/env';

export const makeTokenAdapter = (): TokenAdapter => {
  return new TokenAdapter(env.secrets.jwt, env.secrets.expirationToken);
};
