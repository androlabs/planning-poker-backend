import { BcryptService, makeBcryptService } from '@application/services/crypto';
import { IUserRepository } from '@domain/interfaces';
import { User } from '@domain/models';
import { CreateUserUseCase } from '@domain/use-cases';
import { makeUserRepository } from '@infra/mongodb/repos';

export class CreateUserService implements CreateUserUseCase {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly bcryptService: BcryptService,
  ) {}

  async perform(user: User & { password: string }): Promise<User> {
    user.password = await this.bcryptService.hash(user.password);
    return await this.userRepository.create(user);
  }
}

export const makeCreateUserService = (): CreateUserService => {
  return new CreateUserService(makeUserRepository(), makeBcryptService());
};
