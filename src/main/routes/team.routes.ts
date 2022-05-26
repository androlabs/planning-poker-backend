import {
  makeCreateTeamController,
  makeGetTeamController,
  makeListTeamController,
} from '@application/controllers/team';
import {
  createTeamValidator,
  getTeamValidator,
} from '@application/controllers/team/validators';
import {
  makeAuthMiddleware,
  makeContextUserMiddleware,
} from '@application/middlewares';
import { Http, ResourceMapper } from '@main/interfaces';

const routesTeams: ResourceMapper[] = [
  {
    endPoint: '/team',
    method: Http.Methods.post,
    controller: makeCreateTeamController(),
    validators: [createTeamValidator],
    middlewares: [makeAuthMiddleware(), makeContextUserMiddleware()],
  },
  {
    endPoint: '/team/:team_id',
    method: Http.Methods.get,
    controller: makeGetTeamController(),
    validators: [getTeamValidator],
    middlewares: [makeAuthMiddleware(), makeContextUserMiddleware()],
  },
  {
    endPoint: '/team',
    method: Http.Methods.get,
    controller: makeListTeamController(),
    middlewares: [makeAuthMiddleware(), makeContextUserMiddleware()],
  },
];

export { routesTeams };
