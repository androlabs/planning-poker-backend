import { expressAdapter } from '@infra/adapters';
import { ResourceMapper } from '@main/interfaces';
import { authRoutes } from '@main/routes/auth.routes';
import { healthCheckRoutes } from '@main/routes/health-check.routes';
import { routesTeams } from '@main/routes/team.routes';
import { Express, Router } from 'express';
export const mappingRoutes = (app: Express): void => {
  const resources: ResourceMapper[] = [
    ...routesTeams,
    ...healthCheckRoutes,
    ...authRoutes,
  ];
  const router = Router();

  // eslint-disable-next-line no-console
  console.table(resources, ['method', 'endPoint']);

  resources.forEach((resource) => {
    router[`${resource.method}`](resource.endPoint, (req, res, next) => {
      // TODO log when pass request
      expressAdapter.adapt(resource, req, res, next);
    });
  });

  app.use(router);
};
