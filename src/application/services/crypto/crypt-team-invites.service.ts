import { CryptTeamInvitesUseCase } from '@domain/use-cases';
import { env } from '@main/config/env';
import crypto from 'crypto';

export class CryptTeamInvitesService implements CryptTeamInvitesUseCase {
  encrypt(content: string): string {
    return crypto
      .createHmac('sha256', String(env.secrets.secretInvites))
      .update(content)
      .digest('hex');
  }

  compare(content: string, hash: string): boolean {
    const encrypt = this.encrypt(content);
    return encrypt === hash;
  }
}
