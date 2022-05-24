import { User } from '@domain/models';

export interface CreateUser {
  perform(user: User): Promise<User>;
}
