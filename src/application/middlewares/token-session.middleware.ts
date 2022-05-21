import { MiddlewareContract } from '@domain/contracts';
import { Http } from '@main/interfaces';

export class TokenSessionMiddleware implements MiddlewareContract {
  async handle(request: Http.Request): Promise<void | Error> {
    //
  }
}

export const tokenSessionMiddleware = new TokenSessionMiddleware();
