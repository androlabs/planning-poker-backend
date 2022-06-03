import {
  ListTeamService,
  makeListTeamService,
} from '@application/services/team';
import {
  ListTeamUserService,
  makeListTeamUserService,
} from '@application/services/team-user';
import { Team } from '@domain/models';
import { ListTeamsOfUserUseCase } from '@domain/use-cases';

export class ListTeamsOfUserService implements ListTeamsOfUserUseCase {
  constructor(
    private readonly listTeamUserService: ListTeamUserService,
    private readonly listTeamService: ListTeamService,
  ) {}

  async perform(userId: string): Promise<Team[]> {
    const teamsUser = await this.listTeamUserService.perform({
      filter: { user_id: userId },
    });

    return await this.listTeamService.perform({
      filter: { team_id: teamsUser.map((team) => team.team_id) },
    });
  }
}

/* istanbul ignore next */
export const makeListTeamOfUserService = (): ListTeamsOfUserService => {
  return new ListTeamsOfUserService(
    makeListTeamUserService(),
    makeListTeamService(),
  );
};
