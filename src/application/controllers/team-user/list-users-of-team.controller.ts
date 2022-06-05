import { AppError } from '@application/middlewares/errors';
import {
  ListUsersOfTeamService,
  makeListUsersOfTeamService,
} from '@application/services/user';
import { ControllerContract } from '@domain/contracts';
import { Http } from '@main/interfaces';

class ListUsersOfTeamController implements ControllerContract {
  constructor(
    private readonly listUsersOfTeamService: ListUsersOfTeamService,
  ) {}

  async handle(request: Http.Request): Promise<Http.Response> {
    const { params } = request;

    try {
      const users = await this.listUsersOfTeamService.perform(params.team_id);

      return {
        statusCode: Http.StatusCode.OK,
        data: users,
      };
    } catch (e: any) {
      throw new AppError({
        category: 'FAILURE_LIST_USERS_OF_TEAM',
        message: 'Failed in list users of teams',
        status: Http.StatusCode.BAD_REQUEST,
        messages: e.message,
      });
    }
  }
}

/* istanbul ignore next */
export const makeListUsersOfTeamController = (): ListUsersOfTeamController => {
  return new ListUsersOfTeamController(makeListUsersOfTeamService());
};
