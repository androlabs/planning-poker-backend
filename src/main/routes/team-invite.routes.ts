import { makeCreateTeamInviteController } from '@application/controllers/team-invite';
import { createTeamInviteValidator } from '@application/controllers/team-invite/validators';
import {
  makeAuthMiddleware,
  makeContextUserMiddleware,
} from '@application/middlewares';
import { Http, ResourceMapper } from '@main/interfaces';

const routesTeamInvite: ResourceMapper[] = [
  {
    endPoint: '/teams-invites/:team_id/generate',
    method: Http.Methods.get,
    controller: makeCreateTeamInviteController(),
    middlewares: [makeAuthMiddleware(), makeContextUserMiddleware()],
    validators: [createTeamInviteValidator],
  },
];

export { routesTeamInvite };
