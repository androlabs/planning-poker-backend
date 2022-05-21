import { RepositoryContract } from '@domain/contracts';
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
    const team = await this.databaseAdapter.create(data);
    return { id: team.id, name: team.name };
  }

  async get(id: string): Promise<Team> {
    const team = await this.databaseAdapter.get(id);
    return { id: team.id, name: team.name };
  }

  async list(id: string): Promise<Team[]> {
    throw new Error('Method not implemented.');
  }

  async update(data: Team): Promise<Team> {
    throw new Error('Method not implemented.');
  }

  async delete(id: string): Promise<boolean> {
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
