import { AppError } from '@application/middlewares/errors';
import { ControllerContract } from '@domain/contracts';
import { Encrypter } from '@domain/interfaces/protocols/cryptography.protocol';
import { BasicAuthLoginUsecase } from '@domain/use-cases/auth/basic-auth-login.usecase';
import { Http } from '@main/interfaces';

export class LoginController implements ControllerContract {
  constructor(
    private readonly basicAuthLoginUseCase: BasicAuthLoginUsecase,
    private readonly jwt: Encrypter,
  ) {}

  async handle(request: Http.Request): Promise<Http.Response> {
    const { headers } = request;

    try {
      const user = await this.basicAuthLoginUseCase(headers.authorization);

      const accessToken = await this.jwt.encode({ email: user.email });

      return {
        statusCode: Http.StatusCode.OK,
        data: { accessToken },
      };
    } catch (e: any) {
      throw new AppError({
        message: 'Failed in Login',
        category: 'FAILED_IN_BASIC_LOGIN',
        status: Http.StatusCode.BAD_REQUEST,
        messages: e.message,
      });
    }
  }
}
