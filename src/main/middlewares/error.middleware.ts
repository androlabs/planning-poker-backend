/* eslint-disable @typescript-eslint/no-unused-vars */
import { AppError } from '@application/middlewares/errors';
import { logger } from '@main/config/logger';
import { Http } from '@main/interfaces';
import { NextFunction, Request, Response } from 'express';

export class ErrorMiddleware {
  catch(
    error: Error,
    _request: Request,
    response: Response,
    _: NextFunction,
  ): Response {
    if (error instanceof AppError) {
      return response.status(error.status).json({
        status: 'error',
        message: error.message,
        category: error.category,
        messages: error.messages,
      });
    }

    logger.error('SERVICE_ERROR: ', error);

    return response.status(Http.StatusCode.SERVER_ERROR).json({
      status: 'error',
      message: 'Internal server error',
      category: 'INTERNAL_ERROR',
    });
  }
}

export const errorMiddleware = new ErrorMiddleware();
