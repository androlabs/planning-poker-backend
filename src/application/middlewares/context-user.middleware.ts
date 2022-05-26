import { AppError } from '@application/middlewares/errors';
import { makeTokenService, TokenService } from '@application/services/auth';
import { GetUserService, makeGetUserService } from '@application/services/user';
import { MiddlewareContract } from '@domain/contracts';
import { Http } from '@main/interfaces';

export class ContextUserMiddleware implements MiddlewareContract {
  constructor(
    private readonly tokenService: TokenService,
    private readonly getUserService: GetUserService,
  ) {}

  async handle(request: Http.Request): Promise<void> {
    const { headers } = request;

    try {
      const [, token] = String(headers.authorization).split(/[ ]/g);
      const decode = await this.tokenService.decode(token);

      const user = await this.getUserService.perform({
        filter: { email: decode.email },
      });

      request.user = {
        id: user.id as string,
        email: user.email,
        name: user.name,
      };
    } catch (e: any) {
      throw new AppError({
        message: 'Failed in get user context request',
        category: 'FAILED_IN_AUTH',
        status: Http.StatusCode.BAD_REQUEST,
        messages: e.message,
      });
    }
  }
}

export const makeContextUserMiddleware = (): ContextUserMiddleware => {
  return new ContextUserMiddleware(makeTokenService(), makeGetUserService());
};
