import { ITeamInviteRepository } from '@domain/interfaces';
import { TeamInvite } from '@domain/models';
import {
  CreateTeamInviteDto,
  CreateTeamInviteUseCase,
} from '@domain/use-cases';
import { makeTeamInviteRepository } from '@infra/mongodb/repos';
import dayjs from 'dayjs';

import { SecretTeamInvitesService, secretTeamInvitesService } from '../crypto';

export class CreateTeamInviteService implements CreateTeamInviteUseCase {
  constructor(
    private readonly teamInviteRepository: ITeamInviteRepository,
    private readonly secretTeamInvitesService: SecretTeamInvitesService,
  ) {}

  async perform(params: CreateTeamInviteDto): Promise<TeamInvite> {
    const data = {
      team_id: params.teamId,
      who_invite: params.whoInvite,
      expires: dayjs().add(30, 'minutes').toDate().getTime(),
    };

    return await this.teamInviteRepository.create({
      ...data,
      secret_invite: this.secretTeamInvitesService.perform({
        expires: data.expires,
        teamId: data.team_id,
        whoInvite: data.who_invite,
      }),
    });
  }
}

/* istanbul ignore next */
export const makeCreateTeamInviteService = (): CreateTeamInviteService => {
  return new CreateTeamInviteService(
    makeTeamInviteRepository(),
    secretTeamInvitesService,
  );
};
