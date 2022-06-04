import { ListTeamUserService } from '@application/services/team-user';
import {
  ListUserService,
  ListUsersOfTeamService,
} from '@application/services/user';
import { makeTeamUsers, makeUsers } from '@domain/fakers';
import { mock, MockProxy } from 'jest-mock-extended';

describe(ListUsersOfTeamService, () => {
  let sut: ListUsersOfTeamService;
  let listTeamUserService: MockProxy<ListTeamUserService>;
  let listUserService: MockProxy<ListUserService>;

  beforeEach(() => {
    listTeamUserService = mock<ListTeamUserService>();
    listUserService = mock<ListUserService>();
    sut = new ListUsersOfTeamService(listTeamUserService, listUserService);
  });

  it('should be return users of team', async () => {
    const mockTeamsUsers = makeTeamUsers(10);
    const mockUsers = makeUsers(10);

    listTeamUserService.perform.mockResolvedValueOnce(mockTeamsUsers);
    listUserService.perform.mockResolvedValueOnce(mockUsers);

    const users = await sut.perform('any_team_id');

    expect(users).toEqual(mockUsers);
    expect(listTeamUserService.perform).toHaveBeenCalledWith({
      filter: { team_id: 'any_team_id' },
    });
  });
});
