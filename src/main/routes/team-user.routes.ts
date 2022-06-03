import { makeListTeamsOfUserController } from '@application/controllers/team-user';
import {
  makeAuthMiddleware,
  makeContextUserMiddleware,
} from '@application/middlewares';
import { Http, ResourceMapper } from '@main/interfaces';

const routesTeamsUser: ResourceMapper[] = [
  {
    endPoint: '/user/teams',
    method: Http.Methods.get,
    controller: makeListTeamsOfUserController(),
    middlewares: [makeAuthMiddleware(), makeContextUserMiddleware()],
  },
];

export { routesTeamsUser };
