import { Repository, RepositoryContract } from '@domain/contracts';
import { Team } from '@domain/models';

export interface ITeamRepository extends RepositoryContract<Team> {
  create(data: Team): Promise<Team>;
  get(params: Repository.ParamsGet): Promise<Team>;
  list(params: Repository.ParamsList): Promise<Team[]>;
  update(data: Team, filter: Repository.ParamsUpdate): Promise<Team>;
}
