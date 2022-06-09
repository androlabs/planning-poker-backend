import { SecretTeamInvitesUseCase } from '@domain/use-cases';
import { env } from '@main/config/env';
import crypto from 'crypto';

export class SecretTeamInvitesService implements SecretTeamInvitesUseCase {
  perform(params: {
    teamId: string;
    whoInvite: string;
    expires: number;
  }): string {
    const content = `${params.teamId}:${params.whoInvite}:${params.expires}`;
    const hash = crypto
      .createHmac('sha256', String(env.secrets.secretInvites))
      .update(content)
      .digest('hex');
    return hash.substring(3, 27);
  }
}

export const secretTeamInvitesService = new SecretTeamInvitesService();
