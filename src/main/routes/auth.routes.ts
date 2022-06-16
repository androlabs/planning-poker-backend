import {
  makeMeController,
  makeSignupController,
} from '@application/controllers/auth';
import {
  authValidator,
  signupValidator,
} from '@application/controllers/auth/validators';
import {
  makeAuthMiddleware,
  makeContextUserMiddleware,
} from '@application/middlewares';
import { makeLoginController } from '@main/factories/application/controllers';
import { Http, ResourceMapper } from '@main/interfaces';

const authRoutes: ResourceMapper[] = [
  {
    endPoint: '/signup',
    method: Http.Methods.post,
    controller: makeSignupController(),
    validators: [signupValidator],
  },
  {
    endPoint: '/login',
    method: Http.Methods.post,
    controller: makeLoginController(),
    validators: [authValidator],
  },
  {
    endPoint: '/me',
    method: Http.Methods.get,
    controller: makeMeController(),
    validators: [authValidator],
    middlewares: [makeAuthMiddleware(), makeContextUserMiddleware()],
  },
];

export { authRoutes };
