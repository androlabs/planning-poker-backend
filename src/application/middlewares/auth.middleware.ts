import { MiddlewareContract } from '@domain/contracts';
import { Http } from '@main/interfaces';

export class AuthMiddleware implements MiddlewareContract {
  async handle(request: Http.Request): Promise<void | Error> {
    //
  }
}

export const makeAuthMiddleware = (): AuthMiddleware => {
  return new AuthMiddleware();
};
