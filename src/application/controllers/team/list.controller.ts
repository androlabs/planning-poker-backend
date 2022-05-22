import { AppError } from '@application/middlewares/errors';
import {
  GetTeamService,
  ListTeamService,
  makeListTeamService,
} from '@application/services/team';
import { ControllerContract } from '@domain/contracts';
import { Http } from '@main/interfaces';

class ListTeamController implements ControllerContract {
  constructor(private readonly listTeamService: ListTeamService) {}

  async handle(request: Http.Request): Promise<Http.Response> {
    // TODO list only teams user allow
    const { user } = request;

    try {
      const teams = await this.listTeamService.perform(user.id);

      return {
        statusCode: 200,
        data: teams,
      };
    } catch (e) {
      throw new AppError({
        category: 'FAILURE_LIST_TEAMS',
        message: 'Failed in list teams',
      });
    }
  }
}

export const makeListTeamController = (): ListTeamController => {
  return new ListTeamController(makeListTeamService());
};
