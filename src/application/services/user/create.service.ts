import { User } from '@domain/models';
import { CreateUserUseCase } from '@domain/use-cases';
import { makeUserRepository, UserRepository } from '@infra/mongodb/repos';

export class CreateUserService implements CreateUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async perform(user: User): Promise<User> {
    // TODO encrypt the password
    return await this.userRepository.create(user);
  }
}

export const makeCreateUserService = (): CreateUserService => {
  return new CreateUserService(makeUserRepository());
};
