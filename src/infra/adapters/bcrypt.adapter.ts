import {
  HashComparer,
  Hasher,
} from '@domain/interfaces/protocols/cryptography.protocol';
import { compareSync, hashSync } from 'bcrypt';

export class BcryptAdapter implements Hasher, HashComparer {
  constructor(private readonly salt: number) {}

  async hash(content: string): Promise<string> {
    return hashSync(content, this.salt);
  }

  async compare(plainText: string, hash: string): Promise<boolean> {
    return compareSync(plainText, hash);
  }
}
