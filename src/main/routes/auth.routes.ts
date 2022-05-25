import { makeSignupController } from '@application/controllers/auth';
import { signupValidator } from '@application/controllers/auth/validators';
import { Http, ResourceMapper } from '@main/interfaces';

const authRoutes: ResourceMapper[] = [
  {
    endPoint: '/signup',
    method: Http.Methods.post,
    controller: makeSignupController(),
    validators: [signupValidator],
  },
];

export { authRoutes };
