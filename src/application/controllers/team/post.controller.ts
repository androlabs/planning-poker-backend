import { AppError } from '@application/middlewares/errors';
import {
  CreateTeamService,
  makeCreateTeamService,
} from '@application/services/team';
import { ControllerContract } from '@domain/contracts';
import { Http } from '@main/interfaces';

class TeamCreateController implements ControllerContract {
  constructor(private readonly createTeamService: CreateTeamService) {}

  async handle(request: Http.Request): Promise<Http.Response> {
    const { body } = request;

    try {
      const team = await this.createTeamService.perform({
        name: body.name,
      });

      return {
        statusCode: 201,
        data: team,
      };
    } catch (e) {
      throw new AppError({
        category: 'FAILURE_CREATE_TEAM',
        message: 'Failed in create team',
      });
    }
  }
}

export const makeTeamCreateController = (): TeamCreateController => {
  return new TeamCreateController(makeCreateTeamService());
};
