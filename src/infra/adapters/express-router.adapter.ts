import { ControllerContract } from '@domain/contracts';
import { NextFunction, Request, Response } from 'express';

export const expressRouterAdapter = {
  adapt: async (
    controller: ControllerContract,
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | unknown> => {
    try {
      const response = await controller.handle(req);
      return res.status(response.statusCode).json(response.data);
    } catch (err) {
      return next(err);
    }
  },
};
