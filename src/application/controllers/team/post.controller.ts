import { AppError } from '@application/middlewares/errors';
import {
  CreateTeamService,
  makeCreateTeamService,
} from '@application/services/team';
import {
  CreateTeamUserService,
  makeCreateTeamUserService,
} from '@application/services/team-user';
import { ControllerContract } from '@domain/contracts';
import { Http } from '@main/interfaces';

class CreateTeamController implements ControllerContract {
  constructor(
    private readonly createTeamService: CreateTeamService,
    private readonly createTeamUserService: CreateTeamUserService,
  ) {}

  async handle(request: Http.Request): Promise<Http.Response> {
    const { body } = request;

    try {
      const team = await this.createTeamService.perform({
        name: body.name,
      });

      await this.createTeamUserService.perform({
        is_owner: true,
        team_id: team.id as string,
        user_id: request.user.id,
      });

      return {
        statusCode: Http.StatusCode.CREATED,
        data: team,
      };
    } catch (e: any) {
      throw new AppError({
        category: 'FAILURE_CREATE_TEAM',
        message: 'Failed in create team',
        status: Http.StatusCode.BAD_REQUEST,
        messages: e.message,
      });
    }
  }
}

/* istanbul ignore next */
export const makeCreateTeamController = (): CreateTeamController => {
  return new CreateTeamController(
    makeCreateTeamService(),
    makeCreateTeamUserService(),
  );
};
