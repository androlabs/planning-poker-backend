import { NextFunction, Request, Response } from 'express';
import { v4 as uuid } from 'uuid';

export class AppMiddleware {
  perform(req: Request, _res: Response, next: NextFunction): void {
    req.id = uuid();
    next();
  }
}

export const appMiddleware = new AppMiddleware();
