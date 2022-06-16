import { AppError } from '@application/middlewares/errors';
import {
  CreateTeamInviteService,
  makeCreateTeamInviteService,
} from '@application/services/team-invite';
import {
  GetTeamUserService,
  makeGetTeamUserService,
} from '@application/services/team-user';
import { ControllerContract } from '@domain/contracts';
import { Http } from '@main/interfaces';

export class CreateTeamInviteController implements ControllerContract {
  constructor(
    private readonly createTeamInviteService: CreateTeamInviteService,
    private readonly getTeamUserService: GetTeamUserService,
  ) {}

  async handle(request: Http.Request): Promise<Http.Response> {
    const { params, user } = request;

    try {
      const teamUserOwner = await this.getTeamUserService.perform({
        filter: {
          team_id: params.team_id,
          user_id: user.id,
          is_owner: true,
        },
      });

      if (!teamUserOwner) throw new Error('User is not owner team');

      const teamInvite = await this.createTeamInviteService.perform({
        teamId: params.team_id,
        whoInvite: user.id,
      });

      return {
        statusCode: Http.StatusCode.CREATED,
        data: { secret_invite: teamInvite.secret_invite },
      };
    } catch (e: any) {
      throw new AppError({
        category: 'FAILURE_GET_TEAM',
        message: 'Failed in create team invite',
        status: Http.StatusCode.BAD_REQUEST,
        messages: e.message,
      });
    }
  }
}

/* istanbul ignore next */
export const makeCreateTeamInviteController =
  (): CreateTeamInviteController => {
    return new CreateTeamInviteController(
      makeCreateTeamInviteService(),
      makeGetTeamUserService(),
    );
  };
