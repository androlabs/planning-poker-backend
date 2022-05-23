import { makeHeathCheckController } from '@application/controllers/health-check';
import { Http, ResourceMapper } from '@main/interfaces';

const healthCheckRoutes: ResourceMapper[] = [
  {
    endPoint: '/health-check',
    method: Http.Methods.get,
    controller: makeHeathCheckController(),
  },
];

export { healthCheckRoutes };
