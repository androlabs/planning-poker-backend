import { AppError } from '@application/middlewares/errors';
import { makeTokenService, TokenService } from '@application/services/auth';
import {
  CreateUserService,
  makeCreateUserService,
} from '@application/services/user';
import { ControllerContract } from '@domain/contracts';
import { Http } from '@main/interfaces';

class SignupController implements ControllerContract {
  constructor(
    private readonly userCreateService: CreateUserService,
    private readonly tokenService: TokenService,
  ) {}

  async handle(request: Http.Request): Promise<Http.Response> {
    const { email, name, password } = request.body;

    try {
      const user = await this.userCreateService.perform({
        email,
        name,
        password,
      });

      const accessToken = await this.tokenService.generate(user.email);

      return {
        statusCode: Http.StatusCode.CREATED,
        data: { user, accessToken },
      };
    } catch (e: any) {
      throw new AppError({
        message: 'Failed in Signup',
        category: 'FAILED_IN_SIGNUP',
        status: Http.StatusCode.BAD_REQUEST,
        messages: e.message,
      });
    }
  }
}

export const makeSignupController = (): SignupController => {
  return new SignupController(makeCreateUserService(), makeTokenService());
};
