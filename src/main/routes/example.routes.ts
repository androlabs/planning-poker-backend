import { makeExampleGetController } from '@application/controllers/example';
import {
  tokenSessionMiddleware,
  webhookMiddleware,
} from '@application/middlewares';
import { getExampleValidator } from '@application/validators';
import { Http, ResourceMapper } from '@main/interfaces';

const routesExample: ResourceMapper[] = [
  {
    endPoint: '/example',
    method: Http.Methods.get,
    controller: makeExampleGetController(),
    middlewares: [webhookMiddleware, tokenSessionMiddleware],
    validators: [getExampleValidator],
  },
];

export { routesExample };
