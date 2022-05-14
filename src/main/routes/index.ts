import { routesExample } from '@main/routes/example.routes';
import { Express } from 'express';
export const mappingRoutes = (app: Express): void => {
  app.use(routesExample);
};
