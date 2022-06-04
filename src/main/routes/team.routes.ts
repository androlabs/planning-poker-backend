import {
  makeCreateTeamController,
  makeGetTeamController,
} from '@application/controllers/team';
import {
  createTeamValidator,
  getTeamValidator,
} from '@application/controllers/team/validators';
import { makeListUsersOfTeamController } from '@application/controllers/team-user';
import {
  makeAuthMiddleware,
  makeContextUserMiddleware,
} from '@application/middlewares';
import { Http, ResourceMapper } from '@main/interfaces';

const routesTeams: ResourceMapper[] = [
  {
    endPoint: '/teams',
    method: Http.Methods.post,
    controller: makeCreateTeamController(),
    validators: [createTeamValidator],
    middlewares: [makeAuthMiddleware(), makeContextUserMiddleware()],
  },
  {
    endPoint: '/teams/:team_id',
    method: Http.Methods.get,
    controller: makeGetTeamController(),
    validators: [getTeamValidator],
    middlewares: [makeAuthMiddleware(), makeContextUserMiddleware()],
  },
  {
    endPoint: '/teams/:team_id/users',
    method: Http.Methods.get,
    controller: makeListUsersOfTeamController(),
    validators: [getTeamValidator],
    middlewares: [makeAuthMiddleware(), makeContextUserMiddleware()],
  },
];

export { routesTeams };
