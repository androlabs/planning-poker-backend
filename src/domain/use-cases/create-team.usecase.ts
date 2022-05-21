import { Team } from '@domain/models';

export interface CreateTeamUseCase {
  perform(Team: Team): Promise<Team>;
}
