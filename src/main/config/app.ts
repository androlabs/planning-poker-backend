import { setupMiddlewares } from '@main/config/middlewares';
import { mappingRoutes } from '@main/routes';
import express from 'express';

const app = express();

mappingRoutes(app);
setupMiddlewares(app);

export { app };
