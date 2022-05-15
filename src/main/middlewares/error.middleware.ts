/* eslint-disable @typescript-eslint/no-unused-vars */
import { Http } from '@main/interfaces';
import { NextFunction, Request, Response } from 'express';

export class ErrorMiddleware {
  catch(
    error: Error,
    _request: Request,
    response: Response,
    _: NextFunction,
  ): Response {
    console.log('GLOBAL MIDDLEWARE ERROR');
    // TODO add Custom Error
    // if (error instanceof AppError) {
    //   return response.status(error.statusCode).json({
    //     status: 'error',
    //     message: error.message,
    //     category: error.category,
    //     messages: error.messages,
    //   });
    // }

    // logger('SERVICE_ERROR: ', error);

    return response.status(Http.StatusCode.SERVER_ERROR).json({
      status: 'error',
      message: 'Internal server error',
      category: 'INTERNAL_ERROR',
    });
  }
}

export const errorMiddleware = new ErrorMiddleware();
