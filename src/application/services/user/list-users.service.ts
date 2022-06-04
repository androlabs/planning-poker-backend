import { Repository } from '@domain/contracts';
import { IUserRepository } from '@domain/interfaces';
import { User } from '@domain/models';
import { ListUserUseCase } from '@domain/use-cases';
import { makeUserRepository } from '@infra/mongodb/repos';

export class ListUserService implements ListUserUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async perform(params: Repository.ParamsList): Promise<User[]> {
    return await this.userRepository.list(params);
  }
}

/* istanbul ignore next */
export const makeListUserService = (): ListUserService => {
  return new ListUserService(makeUserRepository());
};
