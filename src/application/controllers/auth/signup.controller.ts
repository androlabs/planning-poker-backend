import {
  CreateUserService,
  makeCreateUserService,
} from '@application/services/user';
import { ControllerContract } from '@domain/contracts';
import { Http } from '@main/interfaces';

class SignupController implements ControllerContract {
  constructor(private readonly userCreateService: CreateUserService) {}

  async handle(request: Http.Request): Promise<Http.Response> {
    // TODO Create, after generate token and return
    const { email, name, password } = request.body;

    const user = await this.userCreateService.perform({
      email,
      name,
      password,
    });

    return {
      statusCode: Http.StatusCode.CREATED,
      data: {},
    };
  }
}

export const makeSignupController = (): SignupController => {
  return new SignupController(makeCreateUserService());
};
