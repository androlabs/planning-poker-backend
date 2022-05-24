import { User } from '@domain/models';
import { CreateTeamUseCase } from '@domain/use-cases';
import { makeUserRepository, UserRepository } from '@infra/mongodb/repos';

export class CreateUserService implements CreateTeamUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async perform(user: User): Promise<User> {
    return await this.userRepository.create(user);
  }
}

export const makeCreateTeamService = (): CreateUserService => {
  return new CreateUserService(makeUserRepository());
};
