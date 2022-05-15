import { makeExampleGetController } from '@application/controllers';
import { expressRouterAdapter } from '@infra/adapters';
import { Http, RouterMapper } from '@main/interfaces';
import { Router } from 'express';

const MAPPER_RESOURCES: RouterMapper[] = [
  {
    endPoint: '/examples',
    method: Http.Methods.get,
    controller: makeExampleGetController(),
    // TODO Pass Generic middlewares
    middlewares: [],
  },
];

const routesExample = Router();

MAPPER_RESOURCES.forEach((resource) => {
  if (resource.method === Http.Methods.get) {
    // TODO Adding logger map route
    routesExample.get(resource.endPoint, (req, res, next) => {
      for (const middleware of resource?.middlewares || []) {
        // TODO Add adapter middleware
        // middleware.handle(req);
      }
      expressRouterAdapter.adapt(resource.controller, req, res, next);
    });
  }
});

export { routesExample };
