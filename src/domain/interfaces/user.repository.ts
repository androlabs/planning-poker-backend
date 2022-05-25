import { Repository, RepositoryContract } from '@domain/contracts';
import { User } from '@domain/models';

export interface IUserRepository extends RepositoryContract<User> {
  get(params: Repository.ParamsGet): Promise<User>;
  create(data: User): Promise<User>;
}
