import { makeTeam, makeTeams } from '@domain/fakers';
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

  describe('Create Team', () => {
    it('should be create a team', async () => {
      const mock = makeTeam();
      databaseAdapter.create.mockResolvedValueOnce(mock);

      const team = await sut.create({
        name: mock.name,
      });

      expect(team).toEqual(mock);
      expect(databaseAdapter.create).toHaveBeenCalledTimes(1);
    });
  });

  describe('Get Team', () => {
    it('should be get a team', async () => {
      const mock = makeTeam();
      databaseAdapter.get.mockResolvedValueOnce(mock);

      const team = await sut.get({
        filter: { id: mock.id },
      });

      expect(team).toEqual(mock);
      expect(databaseAdapter.get).toHaveBeenCalledTimes(1);
    });

    it('should return error when not found team', async () => {
      const mock = makeTeam();

      const promise = sut.get({
        filter: { id: mock.id },
      });

      expect(promise).rejects.toThrow('Team not found');
      expect(databaseAdapter.get).toHaveBeenCalledTimes(1);
    });
  });

  describe('List Teams', () => {
    it('should be return array of teams', async () => {
      const mock = makeTeams(5);
      databaseAdapter.list.mockResolvedValueOnce(mock);

      const teams = await sut.list();

      expect(teams).toHaveLength(5);
      expect(databaseAdapter.list).toHaveBeenCalledTimes(1);
    });
  });

  describe('Update Team', () => {
    it('should be update team', async () => {
      const mock = makeTeam({ id: 'any_team_id', name: 'Squad Bravo' });
      databaseAdapter.update.mockResolvedValueOnce(mock);

      const teamUpdated = await sut.update(
        { name: 'Squad Bravo' },
        { filter: { id: 'any_team_id' } },
      );

      expect(teamUpdated).toEqual(mock);
    });

    it('should be return error when update team', async () => {
      databaseAdapter.update.mockResolvedValueOnce({ id: undefined, name: '' });

      const promise = sut.update(
        { name: 'Squad Bravo' },
        { filter: { id: 'any_team_id' } },
      );

      expect(promise).rejects.toThrow('Team not found');
    });
  });
});
