import { TeamUser } from '@domain/models';

export interface CreateTeamUserUseCase {
  perform(teamUser: TeamUser): Promise<TeamUser>;
}
