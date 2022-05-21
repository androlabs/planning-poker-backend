import { Team } from '@domain/models';

export interface CreateTeamUseCase {
  perform(Team: Team): Promise<Team>;
}

export interface GetTeamUseCase {
  perform(id: string): Promise<Team>;
}
