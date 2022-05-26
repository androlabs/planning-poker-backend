import { env } from '@main/config/env';
import jwt from 'jsonwebtoken';

export class TokenAdapter {
  async encode(content: Record<string, string>): Promise<string> {
    return jwt.sign(content, env.secrets.jwt, {
      expiresIn: env.secrets.expirationToken,
    });
  }

  async decode(token: string): Promise<Record<string, unknown>> {
    return jwt.decode(token) as Record<string, unknown>;
  }

  async verify(token: string): Promise<boolean> {
    try {
      return jwt.verify(token, env.secrets.jwt) !== null;
    } catch {
      throw new Error('Invalid token');
    }
  }
}

export const makeTokenAdapter = (): TokenAdapter => {
  return new TokenAdapter();
};
