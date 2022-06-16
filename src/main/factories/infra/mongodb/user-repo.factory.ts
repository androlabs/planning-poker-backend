import { IUserRepository } from '@domain/interfaces';
import { User } from '@domain/models';
import { MongodbAdapter } from '@infra/adapters';
import { UserRepository } from '@infra/mongodb/repos';
import { userSchema } from '@infra/mongodb/schemas';

export const makeUserRepository = (): IUserRepository => {
  const mongoDbAdapter = new MongodbAdapter<User>(
    userSchema,
    UserRepository.tableName,
  );
  return new UserRepository(mongoDbAdapter);
};
