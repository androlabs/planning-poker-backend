import { Repository, RepositoryContract } from '@domain/contracts';
import { TeamInvite } from '@domain/models';

export interface ITeamInviteRepository extends RepositoryContract<TeamInvite> {
  create(data: TeamInvite): Promise<TeamInvite>;
  get(params: Repository.ParamsGet): Promise<TeamInvite>;
}
