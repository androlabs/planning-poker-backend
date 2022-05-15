import { makeExampleGetController } from '@application/controllers';
import { expressRouterAdapter } from '@infra/adapters';
import { MethodsHttp, RouterMapper } from '@main/interfaces';
import { Router } from 'express';

const MAPPER_RESOURCES: RouterMapper[] = [
  {
    endPoint: '/examples',
    method: MethodsHttp.get,
    controller: makeExampleGetController(),
    // TODO Pass Generic middlewares
    middlewares: [],
  },
];

const routesExample = Router();

MAPPER_RESOURCES.forEach((resource) => {
  if (resource.method === MethodsHttp.get) {
    // TODO Adding logger map route
    console.log(resource.endPoint);
    routesExample.get(resource.endPoint, (req, res, next) => {
      expressRouterAdapter.adapt(resource.controller, req, res, next);
    });
  }
});

export { routesExample };
