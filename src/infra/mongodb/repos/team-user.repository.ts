import { Repository, RepositoryContract } from '@domain/contracts';
import { TeamUser } from '@domain/models';
import { MongodbAdapter } from '@infra/adapters';
import { teamUserSchema } from '@infra/mongodb/schemas';

export class TeamUserRepository implements RepositoryContract<TeamUser> {
  public static tableName = 'team-user';
  private readonly databaseAdapter: MongodbAdapter<TeamUser>;

  constructor(databaseAdapter: MongodbAdapter<TeamUser>) {
    this.databaseAdapter = databaseAdapter;
  }

  async create(data: TeamUser): Promise<TeamUser> {
    const { is_owner, user_id, team_id } = await this.databaseAdapter.create(
      data,
    );
    return { is_owner, user_id, team_id };
  }

  async list(params: Repository.ParamsList): Promise<TeamUser[]> {
    const data = await this.databaseAdapter.list(params);
    return data.map(({ is_owner, user_id, team_id }) => {
      return { is_owner, user_id, team_id };
    });
  }
}

/* istanbul ignore next */
export const makeTeamUserRepository = (): TeamUserRepository => {
  const mongoDbAdapter = new MongodbAdapter<TeamUser>(
    teamUserSchema,
    TeamUserRepository.tableName,
  );
  return new TeamUserRepository(mongoDbAdapter);
};
