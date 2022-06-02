import { Repository } from '@domain/contracts';
import { IUserRepository } from '@domain/interfaces';
import { User } from '@domain/models';
import { GetUserUseCase } from '@domain/use-cases';
import { makeUserRepository } from '@infra/mongodb/repos';

export class GetUserService implements GetUserUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async perform(params: Repository.ParamsGet): Promise<User> {
    return await this.userRepository.get(params);
  }
}

/* istanbul ignore next */
export const makeGetUserService = (): GetUserService => {
  return new GetUserService(makeUserRepository());
};
