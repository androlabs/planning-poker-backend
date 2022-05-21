import { Http, ResourceMapper } from '@main/interfaces';
import { NextFunction, Request, Response } from 'express';

export class ExpressAdapter {
  async adapt(
    resource: ResourceMapper,
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | unknown> {
    try {
      const request: Http.Request = {
        body: req.body,
        path: req.path,
        headers: req.headers,
        params: req.params,
        query: req.query,
      };

      for (const middleware of resource.middlewares || []) {
        await middleware.handle(request);
      }

      for (const validator of resource.validators || []) {
        await validator.handle(request);
      }

      const response = await resource.controller.handle(request);

      return res.status(response.statusCode).json(response.data);
    } catch (err) {
      next(err);
    }
  }
}

export const expressAdapter = new ExpressAdapter();
