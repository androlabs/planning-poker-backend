import { ListTeamsOfUserController } from '@application/controllers/team-user';
import { ListTeamsOfUserService } from '@application/services/team-user';
import { makeRequest, makeTeams } from '@domain/fakers';
import { Http } from '@main/interfaces';
import { mock, MockProxy } from 'jest-mock-extended';

describe(ListTeamsOfUserController, () => {
  let sut: ListTeamsOfUserController;
  let listTeamOfUserService: MockProxy<ListTeamsOfUserService>;
  let request: Http.Request;

  beforeEach(() => {
    listTeamOfUserService = mock<ListTeamsOfUserService>();
    sut = new ListTeamsOfUserController(listTeamOfUserService);

    request = makeRequest();
  });

  it('should be return teams of user', async () => {
    const mock = makeTeams();
    listTeamOfUserService.perform.mockResolvedValueOnce(mock);

    const result = await sut.handle(request);

    expect(result).toEqual({
      statusCode: Http.StatusCode.OK,
      data: mock,
    });
  });

  it('should be return return error in get teams of user', async () => {
    listTeamOfUserService.perform.mockRejectedValue(
      new Error('User not found'),
    );

    await sut.handle(request).catch((e) => {
      expect(e).toEqual({
        category: 'FAILURE_LIST_TEAMS_OF_USER',
        message: 'Failed in list teams of user',
        status: Http.StatusCode.BAD_REQUEST,
        messages: 'User not found',
      });
    });
  });
});
