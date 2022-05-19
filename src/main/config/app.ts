import { setupMiddlewares } from '@main/config/middlewares';
import { errorMiddleware } from '@main/middlewares';
import { mappingRoutes } from '@main/routes';
import express from 'express';

const app = express();

setupMiddlewares(app);
mappingRoutes(app);

// GLOBAL MIDDLEWARE ERROR
app.use(errorMiddleware.catch);

export { app };
