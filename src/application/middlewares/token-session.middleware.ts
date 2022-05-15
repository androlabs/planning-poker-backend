import { MiddlewareContract } from '@domain/contracts';
import { Http } from '@main/interfaces';

export class TokenSessionMiddleware implements MiddlewareContract {
  async handle(request: Http.Request): Promise<void | Error> {
    console.log('MIDDLWARE');
    // throw new Error('Error Middleware');
  }
}

export const tokenSessionMiddleware = new TokenSessionMiddleware();
