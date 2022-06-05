import { AppError } from '@application/middlewares/errors';
import {
  makeUpdateTeamService,
  UpdateTeamService,
} from '@application/services/team';
import { ControllerContract } from '@domain/contracts';
import { Http } from '@main/interfaces';

export class UpdateTeamController implements ControllerContract {
  constructor(private readonly updateTeamService: UpdateTeamService) {}

  async handle(request: Http.Request): Promise<Http.Response> {
    const { params, body } = request;

    try {
      await this.updateTeamService.perform(
        { name: body.name },
        { filter: { id: params.team_id } },
      );

      return { statusCode: Http.StatusCode.NO_CONTENT };
    } catch (e: any) {
      throw new AppError({
        category: 'FAILURE_UPDATE_TEAM',
        message: 'Failed in update team',
        status: Http.StatusCode.BAD_REQUEST,
        messages: e.message,
      });
    }
  }
}

/* istanbul ignore next */
export const makeUpdateTeamController = (): UpdateTeamController => {
  return new UpdateTeamController(makeUpdateTeamService());
};
