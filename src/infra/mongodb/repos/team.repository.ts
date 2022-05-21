import { RepositoryContract } from '@domain/contracts';
import { Team } from '@domain/models';
import { MongodbAdapter } from '@infra/adapters';
import { teamSchema } from '@infra/mongodb/schemas';

export class TeamRepository implements RepositoryContract<Team> {
  public static tableName = 'Team';
  private readonly databaseAdapter: MongodbAdapter<Team>;

  constructor(databaseAdapter: MongodbAdapter<Team>) {
    this.databaseAdapter = databaseAdapter;
  }

  async create(data: Team): Promise<Team> {
    const team = await this.databaseAdapter.create(data);
    return { id: team.id, name: team.name };
  }

  get(id: string | number): Promise<Team> {
    throw new Error('Method not implemented.');
  }

  update(data: Team): Promise<Team> {
    throw new Error('Method not implemented.');
  }

  delete(id: string | number): Promise<boolean> {
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
