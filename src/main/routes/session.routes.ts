import { makeSessionCreateController } from '@application/controllers/session';
import { createSessionValidator } from '@application/validators';
import { Http, ResourceMapper } from '@main/interfaces';

const routesSession: ResourceMapper[] = [
  {
    endPoint: '/session',
    method: Http.Methods.post,
    controller: makeSessionCreateController(),
    validators: [createSessionValidator],
  },
];

export { routesSession };
