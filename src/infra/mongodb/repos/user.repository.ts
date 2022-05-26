import { Repository, RepositoryContract } from '@domain/contracts';
import { User } from '@domain/models';
import { MongodbAdapter } from '@infra/adapters';
import { userSchema } from '@infra/mongodb/schemas';

export class UserRepository implements RepositoryContract<User> {
  public static tableName = 'user';
  private readonly databaseAdapter: MongodbAdapter<User>;

  constructor(databaseAdapter: MongodbAdapter<User>) {
    this.databaseAdapter = databaseAdapter;
  }

  async create(data: User): Promise<User> {
    try {
      const { id, email, name } = await this.databaseAdapter.create(data);
      return { id, email, name };
    } catch (e: any) {
      if (e.code === 11000) throw new Error('Email already in use');
      throw e;
    }
  }

  async get(params: Repository.ParamsGet): Promise<User> {
    const { id, email, name, password } = await this.databaseAdapter.get(
      params,
    );
    return { id, email, name, password };
  }
}

export const makeUserRepository = (): UserRepository => {
  const mongoDbAdapter = new MongodbAdapter<User>(
    userSchema,
    UserRepository.tableName,
  );
  return new UserRepository(mongoDbAdapter);
};
