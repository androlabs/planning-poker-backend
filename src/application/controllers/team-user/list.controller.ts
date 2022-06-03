import { AppError } from '@application/middlewares/errors';
import {
  ListTeamsOfUserService,
  makeListTeamOfUserService,
} from '@application/services/team-user';
import { ControllerContract } from '@domain/contracts';
import { Http } from '@main/interfaces';

class ListTeamsOfUserController implements ControllerContract {
  constructor(private readonly listTeamOfUserService: ListTeamsOfUserService) {}

  async handle(request: Http.Request): Promise<Http.Response> {
    const { user } = request;

    try {
      const teams = await this.listTeamOfUserService.perform(user.id);

      return {
        statusCode: Http.StatusCode.OK,
        data: teams,
      };
    } catch (e: any) {
      throw new AppError({
        category: 'FAILURE_LIST_TEAMS_OF_USER',
        message: 'Failed in list teams of user',
        status: Http.StatusCode.BAD_REQUEST,
        messages: e.message,
      });
    }
  }
}

/* istanbul ignore next */
export const makeListTeamsOfUserController = (): ListTeamsOfUserController => {
  return new ListTeamsOfUserController(makeListTeamOfUserService());
};
