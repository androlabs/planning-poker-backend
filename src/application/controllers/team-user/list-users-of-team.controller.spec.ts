import { ListUsersOfTeamController } from '@application/controllers/team-user';
import { ListUsersOfTeamService } from '@application/services/user';
import { makeRequest, makeUsers } from '@domain/fakers';
import { Http } from '@main/interfaces';
import { mock, MockProxy } from 'jest-mock-extended';

describe(ListUsersOfTeamController, () => {
  let sut: ListUsersOfTeamController;
  let listUsersOfTeamService: MockProxy<ListUsersOfTeamService>;
  let request: Http.Request;

  beforeEach(() => {
    listUsersOfTeamService = mock<ListUsersOfTeamService>();
    sut = new ListUsersOfTeamController(listUsersOfTeamService);

    request = makeRequest();
    request.params = { team_id: 'any_team_id' };
  });

  it('should be return users of team', async () => {
    const mock = makeUsers();
    listUsersOfTeamService.perform.mockResolvedValueOnce(mock);

    const result = await sut.handle(request);

    expect(result).toEqual({
      statusCode: Http.StatusCode.OK,
      data: mock,
    });
  });

  it('should be return return error in users of team', async () => {
    listUsersOfTeamService.perform.mockRejectedValue(
      new Error('Team not found'),
    );

    await sut.handle(request).catch((e) => {
      expect(e).toEqual({
        category: 'FAILURE_LIST_USERS_OF_TEAM',
        message: 'Failed in list users of teams',
        status: Http.StatusCode.BAD_REQUEST,
        messages: 'Team not found',
      });
    });
  });
});
