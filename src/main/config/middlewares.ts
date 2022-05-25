import { appMiddleware } from '@main/middlewares';
import cors from 'cors';
import { Express, json } from 'express';

export const setupMiddlewares = (app: Express): void => {
  app.use(cors());
  app.use(json({ limit: '10mb' }));
  app.use(appMiddleware.perform);
};
