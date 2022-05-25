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

    const user = await this.userCreateService.perform({
      email,
      name,
      password,
    });

    const accessToken = await this.generateTokenService.perform(user.email);

    return {
      statusCode: Http.StatusCode.CREATED,
      data: {
        user,
        accessToken,
      },
    };
  }
}

export const makeSignupController = (): SignupController => {
  return new SignupController(
    makeCreateUserService(),
    makeGenerateTokenService(),
  );
};
