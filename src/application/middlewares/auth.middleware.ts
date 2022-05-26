import { AppError } from '@application/middlewares/errors';
import { makeTokenService, TokenService } from '@application/services/auth';
import { MiddlewareContract } from '@domain/contracts';
import { Http } from '@main/interfaces';

export class AuthMiddleware implements MiddlewareContract {
  constructor(private readonly tokenService: TokenService) {}

  async handle(request: Http.Request): Promise<void> {
    const { headers } = request;

    try {
      const [, token] = String(headers.authorization).split(/[ ]/g);

      await this.tokenService.verify(token);
    } catch (e: any) {
      throw new AppError({
        message: 'Failed in Auth',
        category: 'FAILED_IN_AUTH',
        status: Http.StatusCode.BAD_REQUEST,
        messages: e.message,
      });
    }
  }
}

export const makeAuthMiddleware = (): AuthMiddleware => {
  return new AuthMiddleware(makeTokenService());
};
