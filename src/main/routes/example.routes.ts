import { Request, Response, Router } from 'express';

const routesExample = Router();

routesExample.get('/example', (_req: Request, res: Response) => {
  return res.json('examples');
});

export { routesExample };
