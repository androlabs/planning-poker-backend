import { expressAdapter } from '@infra/adapters';
import { ResourceMapper } from '@main/interfaces';
import { healthCheckRoutes } from '@main/routes/health-check.routes';
import { routesTeams } from '@main/routes/team.routes';
import { Express, Router } from 'express';
export const mappingRoutes = (app: Express): void => {
  const resources: ResourceMapper[] = [...routesTeams, ...healthCheckRoutes];
  const router = Router();

  // eslint-disable-next-line no-console
  console.table(resources, ['method', 'endPoint']);

  resources.forEach((resource) => {
    router[`${resource.method}`](resource.endPoint, (req, res, next) => {
      expressAdapter.adapt(resource, req, res, next);
    });
  });

  app.use(router);
};
