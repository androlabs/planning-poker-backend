import { CreateTeamController } from '@application/controllers/team';
import { CreateTeamService } from '@application/services/team';
import { CreateTeamUserService } from '@application/services/team-user';
import { makeRequest, makeTeam } from '@domain/fakers';
import { Http } from '@main/interfaces';
import { mock, MockProxy } from 'jest-mock-extended';

describe(CreateTeamController, () => {
  let sut: CreateTeamController;
  let createTeamService: MockProxy<CreateTeamService>;
  let createTeamUserService: MockProxy<CreateTeamUserService>;
  let request: Http.Request;

  beforeEach(() => {
    createTeamService = mock<CreateTeamService>();
    createTeamUserService = mock<CreateTeamUserService>();
    sut = new CreateTeamController(createTeamService, createTeamUserService);

    request = makeRequest();
  });

  it('should be return team created', async () => {
    const mockTeam = makeTeam();

    request.body = { name: mockTeam.name };
    createTeamService.perform.mockResolvedValueOnce(mockTeam);
    createTeamUserService.perform.mockResolvedValueOnce({
      team_id: mockTeam.id as string,
      user_id: request.user.id,
      is_owner: true,
    });

    const response = await sut.handle(request);

    expect(response).toEqual({
      statusCode: Http.StatusCode.CREATED,
      data: mockTeam,
    });
  });

  it('should be return error in create team', async () => {
    const mockTeam = makeTeam();

    request.body = { name: mockTeam.name };
    createTeamService.perform.mockRejectedValue(new Error('Failed in create'));

    await sut.handle(request).catch((e) => {
      expect(e).toEqual({
        category: 'FAILURE_CREATE_TEAM',
        message: 'Failed in create team',
        status: Http.StatusCode.BAD_REQUEST,
        messages: 'Failed in create',
      });
    });
  });
});
