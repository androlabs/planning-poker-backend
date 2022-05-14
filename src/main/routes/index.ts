import { Express } from 'express';

import { routesExample } from '@main/routes/example.routes';
export const mappingRoutes = (app: Express): void => {
  app.use(routesExample);
};
