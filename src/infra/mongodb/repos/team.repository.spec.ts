import { Team } from '@domain/models';
import { MongodbAdapter } from '@infra/adapters';
import { TeamRepository } from '@infra/mongodb/repos';
import { mock, MockProxy } from 'jest-mock-extended';

describe(TeamRepository, () => {
  let sut: TeamRepository;
  let databaseAdapter: MockProxy<MongodbAdapter<Team>>;

  beforeEach(() => {
    databaseAdapter = mock<MongodbAdapter<Team>>();
    sut = new TeamRepository(databaseAdapter);
  });

  it('should be create a team', async () => {
    const mock = { id: 'cf282856', name: 'Jedi Squad' };
    databaseAdapter.create.mockResolvedValueOnce(mock);

    const team = await sut.create({
      name: mock.name,
    });

    expect(team).toEqual(mock);
  });

  it('should be get a team', async () => {
    const mock = { id: '864a88307ec4', name: 'Jedi Order' };
    databaseAdapter.get.mockResolvedValueOnce(mock);

    const team = await sut.get({
      filter: { id: mock.id },
    });

    expect(team).toEqual(mock);
  });
});
