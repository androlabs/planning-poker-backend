import { AppError } from '@application/middlewares/errors';
import { GetTeamService, makeGetTeamService } from '@application/services/team';
import { ControllerContract } from '@domain/contracts';
import { Http } from '@main/interfaces';

class GetTeamController implements ControllerContract {
  constructor(private readonly getTeamService: GetTeamService) {}

  async handle(request: Http.Request): Promise<Http.Response> {
    const { params } = request;

    try {
      const team = await this.getTeamService.perform(params.team_id);

      return {
        statusCode: Http.StatusCode.OK,
        data: team,
      };
    } catch (e: any) {
      throw new AppError({
        category: 'FAILURE_GET_TEAM',
        message: 'Failed in get team',
        status: Http.StatusCode.BAD_REQUEST,
        messages: e.message,
      });
    }
  }
}

export const makeGetTeamController = (): GetTeamController => {
  return new GetTeamController(makeGetTeamService());
};
