import { expressAdapter } from '@infra/adapters';
import { ResourceMapper } from '@main/interfaces';
import { routesExample } from '@main/routes/example.routes';
import { Express, Router } from 'express';
export const mappingRoutes = (app: Express): void => {
  const resources: ResourceMapper[] = [...routesExample];
  const router = Router();

  resources.forEach((resource) => {
    // TODO Adding logger map route

    router[`${resource.method}`](resource.endPoint, (req, res, next) => {
      expressAdapter.adapt(resource, req, res, next);
    });
  });

  app.use(router);
};
