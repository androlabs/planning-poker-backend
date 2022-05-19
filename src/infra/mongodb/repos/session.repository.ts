import { RepositoryContract } from '@domain/contracts';
import { Session } from '@domain/models';
import { MongodbAdapter } from '@infra/adapters';
import { sessionSchema } from '@infra/mongodb/schemas';

export class SessionRepository implements RepositoryContract<Session> {
  public static tableName = 'Session';
  private readonly databaseAdapter: MongodbAdapter<Session>;

  constructor(databaseAdapter: MongodbAdapter<Session>) {
    this.databaseAdapter = databaseAdapter;
  }

  async create(data: Session): Promise<Session> {
    return await this.databaseAdapter.create(data);
  }

  get(id: string | number): Promise<Session> {
    throw new Error('Method not implemented.');
  }

  update(data: Session): Promise<Session> {
    throw new Error('Method not implemented.');
  }

  delete(id: string | number): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
}

export const makeSessionRepository = (): SessionRepository => {
  const mongoDbAdapter = new MongodbAdapter<Session>(
    sessionSchema,
    SessionRepository.tableName,
  );
  return new SessionRepository(mongoDbAdapter);
};
