import { RepositoryContract } from '@domain/contracts';
import { Team } from '@domain/models';
import { MongodbAdapter } from '@infra/adapters';
import { teamSchema } from '@infra/mongodb/schemas';

type Filter = {
  where: {
    id: string;
  };
};

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

  async get(id: string | number): Promise<Team> {
    const team = await this.databaseAdapter.get(id);
    return { id: team.id, name: team.name };
  }

  async list(): Promise<Team[]> {
    const teams = await this.databaseAdapter.list({
      // fields: ['id'],
      // paginate: { limit: 2, skip: 0 },
    });
    return teams;
  }

  async update(data: Team, filter: Filter): Promise<Team> {
    throw new Error('Method not implemented.');
  }
}

export const makeTeamRepository = (): TeamRepository => {
  const mongoDbAdapter = new MongodbAdapter<Team>(
    teamSchema,
    TeamRepository.tableName,
  );
  return new TeamRepository(mongoDbAdapter);
};
