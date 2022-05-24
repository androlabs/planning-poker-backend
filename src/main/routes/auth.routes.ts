import { makeSignupController } from '@application/controllers/auth';
import { Http, ResourceMapper } from '@main/interfaces';

const authRoutes: ResourceMapper[] = [
  {
    endPoint: '/signup',
    method: Http.Methods.post,
    controller: makeSignupController(),
    // TODO add validator
    validators: [],
  },
];

export { authRoutes };
