import {
  Decrypter,
  Encrypter,
  EncrypterVerify,
} from '@domain/interfaces/protocols/cryptography.protocol';
import jwt from 'jsonwebtoken';

export class TokenAdapter implements Decrypter, Encrypter, EncrypterVerify {
  constructor(
    private readonly secret: string,
    private readonly expirationToken: string,
  ) {}

  async encode(content: Record<string, string>): Promise<string> {
    return jwt.sign(content, this.secret, {
      expiresIn: this.expirationToken,
    });
  }

  async decode(token: string): Promise<Record<string, unknown>> {
    return jwt.decode(token) as Record<string, unknown>;
  }

  async verify(token: string): Promise<boolean> {
    return jwt.verify(token, this.secret) !== null;
  }
}
