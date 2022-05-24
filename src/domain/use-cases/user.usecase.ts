import { User } from '@domain/models';

export interface CreateUserUseCase {
  perform(user: User): Promise<User>;
}
