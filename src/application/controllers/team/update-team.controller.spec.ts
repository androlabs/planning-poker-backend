import { UpdateTeamController } from '@application/controllers/team';
import { UpdateTeamService } from '@application/services/team';
import { makeRequest, makeTeam } from '@domain/fakers';
import { Http } from '@main/interfaces';
import { mock, MockProxy } from 'jest-mock-extended';

describe(UpdateTeamController, () => {
  let sut: UpdateTeamController;
  let updateTeamService: MockProxy<UpdateTeamService>;
  let request: Http.Request;

  beforeEach(() => {
    updateTeamService = mock<UpdateTeamService>();
    sut = new UpdateTeamController(updateTeamService);

    request = makeRequest();
    request.params = { team_id: 'any_team_id' };
  });

  it('should be update team', async () => {
    const mock = makeTeam({ id: 'any_team_id' });
    updateTeamService.perform.mockResolvedValueOnce(mock);

    const response = await sut.handle(request);

    expect(response).toEqual({
      statusCode: Http.StatusCode.NO_CONTENT,
    });
  });

  it('should be return error in update team', async () => {
    updateTeamService.perform.mockRejectedValueOnce(
      new Error('Team not found'),
    );

    await sut.handle(request).catch((e) => {
      expect(e).toEqual({
        category: 'FAILURE_UPDATE_TEAM',
        message: 'Failed in update team',
        status: Http.StatusCode.BAD_REQUEST,
        messages: 'Team not found',
      });
    });
  });
});
