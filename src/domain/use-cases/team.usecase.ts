import { Team } from '@domain/models';

export interface CreateTeamUseCase {
  perform(team: Team): Promise<Team>;
}

export interface GetTeamUseCase {
  perform(id: string): Promise<Team>;
}

export interface ListTeamUseCase {
  perform(userId: string): Promise<Team[]>;
}
