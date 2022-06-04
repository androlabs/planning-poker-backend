import { Repository } from '@domain/contracts';
import { Team, TeamUser, User } from '@domain/models';

export interface CreateTeamUserUseCase {
  perform(teamUser: TeamUser): Promise<TeamUser>;
}

export interface ListTeamUserUseCase {
  perform(params: Repository.ParamsList): Promise<TeamUser[]>;
}

export interface ListTeamsOfUserUseCase {
  perform(userId: string): Promise<Team[]>;
}

export interface ListUsersOfTeamUseCase {
  perform(teamId: string): Promise<User[]>;
}
