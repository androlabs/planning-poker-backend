import { Repository, RepositoryContract } from '@domain/contracts';
import { TeamUser } from '@domain/models';

export interface ITeamUserRepository extends RepositoryContract<TeamUser> {
  create(data: TeamUser): Promise<TeamUser>;
  list(params: Repository.ParamsList): Promise<TeamUser[]>;
}
