import { AppError } from '@application/middlewares/errors';
import {
  GenerateTokenService,
  makeGenerateTokenService,
} from '@application/services/auth';
import {
  CreateUserService,
  makeCreateUserService,
} from '@application/services/user';
import { ControllerContract } from '@domain/contracts';
import { Http } from '@main/interfaces';

class SignupController implements ControllerContract {
  constructor(
    private readonly userCreateService: CreateUserService,
    private readonly generateTokenService: GenerateTokenService,
  ) {}

  async handle(request: Http.Request): Promise<Http.Response> {
    const { email, name, password } = request.body;

    try {
      const user = await this.userCreateService.perform({
        email,
        name,
        password,
      });

      const accessToken = await this.generateTokenService.perform(user.email);

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
  return new SignupController(
    makeCreateUserService(),
    makeGenerateTokenService(),
  );
};
