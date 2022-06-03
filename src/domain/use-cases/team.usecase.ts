import { Repository } from '@domain/contracts';
import { Team } from '@domain/models';

export interface CreateTeamUseCase {
  perform(team: Team): Promise<Team>;
}

export interface GetTeamUseCase {
  perform(id: string): Promise<Team>;
}

export interface ListTeamUseCase {
  perform(params: Repository.ParamsList): Promise<Team[]>;
}
