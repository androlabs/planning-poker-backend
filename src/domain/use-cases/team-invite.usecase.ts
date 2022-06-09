import { Repository } from '@domain/contracts';
import { TeamInvite } from '@domain/models';

export type CreateTeamInviteDto = {
  teamId: string;
  whoInvite: string;
};

export interface CreateTeamInviteUseCase {
  perform(params: CreateTeamInviteDto): Promise<TeamInvite>;
}

export interface GetTeamInviteUseCase {
  perform(params: Repository.ParamsGet): Promise<TeamInvite>;
}
