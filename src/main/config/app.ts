import { mappingRoutes } from '@main/routes';
// import { setupMiddlewares } from '@main/config/middlewares';
import express from 'express';

const app = express();
// setupMiddlewares(app);
mappingRoutes(app);

export { app };
