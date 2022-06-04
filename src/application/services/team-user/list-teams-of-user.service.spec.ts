import { ListTeamService } from '@application/services/team';
import {
  ListTeamsOfUserService,
  ListTeamUserService,
} from '@application/services/team-user';
import { makeTeams, makeTeamUsers, makeUser } from '@domain/fakers';
import { mock, MockProxy } from 'jest-mock-extended';

describe(ListTeamsOfUserService, () => {
  let sut: ListTeamsOfUserService;
  let listTeamUserService: MockProxy<ListTeamUserService>;
  let listTeamService: MockProxy<ListTeamService>;

  beforeEach(() => {
    listTeamUserService = mock<ListTeamUserService>();
    listTeamService = mock<ListTeamService>();
    sut = new ListTeamsOfUserService(listTeamUserService, listTeamService);
  });

  it('should be return teams of user', async () => {
    const user = makeUser();
    const mockTeamUsers = makeTeamUsers(5);
    const mockTeams = makeTeams(5);
    const teamsIds = mockTeamUsers.map((team) => team.team_id);

    listTeamUserService.perform.mockResolvedValueOnce(mockTeamUsers);
    listTeamService.perform.mockResolvedValueOnce(mockTeams);

    const teams = await sut.perform(user.id as string);

    expect(teams).toEqual(mockTeams);
    expect(listTeamService.perform).toHaveBeenCalledTimes(1);
    expect(listTeamService.perform).toHaveBeenCalledWith({
      filter: { team_id: teamsIds },
    });
  });
});
