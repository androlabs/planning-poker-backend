import { makeTokenService, TokenService } from '@application/services/auth';
import { ControllerContract } from '@domain/contracts';
import { Http } from '@main/interfaces';

class MeController implements ControllerContract {
  constructor(private readonly tokenService: TokenService) {}

  async handle(request: Http.Request): Promise<Http.Response> {
    const [, token] = String(request.headers.authorization).split(/[ ]/g);

    const decode = await this.tokenService.decode(token);
    // TODO implement get user service

    return {
      statusCode: Http.StatusCode.OK,
      data: {},
    };
  }
}

export const makeMeController = (): MeController => {
  return new MeController(makeTokenService());
};
