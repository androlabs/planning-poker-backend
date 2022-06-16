import { LoginController } from '@application/controllers/auth';
import { makeBasicAuthLoginUsecase } from '@main/factories/domain/usecases/basic-auth-login.factory';
import { makeTokenAdapter } from '@main/factories/infra/adapters/token.factory';

export const makeLoginController = (): LoginController => {
  return new LoginController(makeBasicAuthLoginUsecase(), makeTokenAdapter());
};
