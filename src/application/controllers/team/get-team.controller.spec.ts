import { GetTeamController } from '@application/controllers/team';
import { GetTeamService } from '@application/services/team';
import { makeRequest, makeTeam } from '@domain/fakers';
import { Http } from '@main/interfaces';
import { mock, MockProxy } from 'jest-mock-extended';

describe(GetTeamController, () => {
  let sut: GetTeamController;
  let getTeamService: MockProxy<GetTeamService>;
  let request: Http.Request;

  beforeEach(() => {
    getTeamService = mock<GetTeamService>();
    sut = new GetTeamController(getTeamService);

    request = makeRequest();
    request.params = { team_id: 'any_team_id' };
  });

  it('should be return team by id', async () => {
    const mock = makeTeam({ id: 'any_team_id' });
    getTeamService.perform.mockResolvedValueOnce(mock);

    const response = await sut.handle(request);

    expect(response).toEqual({
      statusCode: Http.StatusCode.OK,
      data: mock,
    });
  });

  it('should be return error in get team by id', async () => {
    getTeamService.perform.mockRejectedValueOnce(new Error('Team not found'));

    await sut.handle(request).catch((e) => {
      expect(e).toEqual({
        category: 'FAILURE_GET_TEAM',
        message: 'Failed in get team',
        status: Http.StatusCode.BAD_REQUEST,
        messages: 'Team not found',
      });
    });
  });
});
