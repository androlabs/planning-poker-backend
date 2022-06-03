import { makeTokenService, TokenService } from '@application/services/auth';
import { GetUserService, makeGetUserService } from '@application/services/user';
import { ControllerContract } from '@domain/contracts';
import { Http } from '@main/interfaces';

export class MeController implements ControllerContract {
  constructor(
    private readonly tokenService: TokenService,
    private readonly getUserService: GetUserService,
  ) {}

  async handle(request: Http.Request): Promise<Http.Response> {
    const [, token] = String(request.headers.authorization).split(/[ ]/g);

    const decode = await this.tokenService.decode(token);
    const user = await this.getUserService.perform({
      filter: { email: decode.email },
    });

    return {
      statusCode: Http.StatusCode.OK,
      data: user,
    };
  }
}

/* istanbul ignore next */
export const makeMeController = (): MeController => {
  return new MeController(makeTokenService(), makeGetUserService());
};
