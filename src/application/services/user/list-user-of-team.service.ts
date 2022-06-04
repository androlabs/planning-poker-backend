import {
  ListTeamUserService,
  makeListTeamUserService,
} from '@application/services/team-user';
import { User } from '@domain/models';
import { ListUsersOfTeamUseCase } from '@domain/use-cases';

import { ListUserService, makeListUserService } from './list.service';

export class ListUsersOfTeamService implements ListUsersOfTeamUseCase {
  constructor(
    private readonly listTeamUserService: ListTeamUserService,
    private readonly listUserService: ListUserService,
  ) {}

  async perform(teamId: string): Promise<User[]> {
    const teamUsers = await this.listTeamUserService.perform({
      filter: { team_id: teamId },
    });

    return await this.listUserService.perform({
      filter: { id: teamUsers.map((teamUser) => teamUser.user_id) },
    });
  }
}

/* istanbul ignore next */
export const makeListUsersOfTeamService = (): ListUsersOfTeamService => {
  return new ListUsersOfTeamService(
    makeListTeamUserService(),
    makeListUserService(),
  );
};
