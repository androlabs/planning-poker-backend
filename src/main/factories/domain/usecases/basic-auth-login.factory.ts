import {
  BasicAuthLoginUsecase,
  setupBasicAuthLoginUsecase,
} from '@domain/use-cases/auth/basic-auth-login.usecase';
import { makeBcryptAdapter } from '@main/factories/infra/adapters/bycript.factory';
import { makeUserRepository } from '@main/factories/infra/mongodb/user-repo.factory';

export const makeBasicAuthLoginUsecase = (): BasicAuthLoginUsecase => {
  return setupBasicAuthLoginUsecase(makeUserRepository(), makeBcryptAdapter());
};
