import {
  makeLoginController,
  makeMeController,
  makeSignupController,
} from '@application/controllers/auth';
import {
  authValidator,
  signupValidator,
} from '@application/controllers/auth/validators';
import { makeAuthMiddleware } from '@application/middlewares';
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
    middlewares: [makeAuthMiddleware()],
  },
];

export { authRoutes };
