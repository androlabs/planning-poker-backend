import { Repository, RepositoryContract } from '@domain/contracts';
import { Team } from '@domain/models';
import { MongodbAdapter } from '@infra/adapters';
import { teamSchema } from '@infra/mongodb/schemas';

export class TeamRepository implements RepositoryContract<Team> {
  public static tableName = 'team';
  private readonly databaseAdapter: MongodbAdapter<Team>;

  constructor(databaseAdapter: MongodbAdapter<Team>) {
    this.databaseAdapter = databaseAdapter;
  }

  async create(data: Team): Promise<Team> {
    const { id, name } = await this.databaseAdapter.create(data);
    return { id, name };
  }

  async get(params: Repository.ParamsGet): Promise<Team> {
    const team = await this.databaseAdapter.get(params);

    if (!team?.id) throw new Error('Team not found');

    return { id: team.id, name: team.name };
  }

  async list(params: Repository.ParamsList = {}): Promise<Team[]> {
    const teams = await this.databaseAdapter.list(params);
    return teams.map(({ id, name }) => {
      return { id, name };
    });
  }

  async update(data: Team, filter: Repository.ParamsUpdate): Promise<Team> {
    const team = await this.databaseAdapter.update(data, filter);

    if (!team?.id) throw new Error('Team not found');

    return { id: team.id, name: team.name };
  }
}

/* istanbul ignore next */
export const makeTeamRepository = (): TeamRepository => {
  const mongoDbAdapter = new MongodbAdapter<Team>(
    teamSchema,
    TeamRepository.tableName,
  );
  return new TeamRepository(mongoDbAdapter);
};
