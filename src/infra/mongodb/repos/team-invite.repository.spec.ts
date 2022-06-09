import { makeTeamInvite } from '@domain/fakers/team-invites.faker';
import { TeamInvite } from '@domain/models';
import { MongodbAdapter } from '@infra/adapters';
import { TeamInviteRepository } from '@infra/mongodb/repos';
import { mock, MockProxy } from 'jest-mock-extended';

describe(TeamInviteRepository, () => {
  let sut: TeamInviteRepository;
  let databaseAdapter: MockProxy<MongodbAdapter<TeamInvite>>;

  beforeEach(() => {
    databaseAdapter = mock<MongodbAdapter<TeamInvite>>();
    sut = new TeamInviteRepository(databaseAdapter);
  });

  describe('Create Team Invite', () => {
    it('should be create a team invite', async () => {
      const mock = makeTeamInvite();
      databaseAdapter.create.mockResolvedValueOnce(mock);

      const teamInvite = await sut.create(mock);
      expect(teamInvite).toEqual(mock);
    });
  });

  describe('Get Team Invite', () => {
    it('should be return a team invite', async () => {
      const mock = makeTeamInvite();
      databaseAdapter.get.mockResolvedValueOnce(mock);

      const teamInvite = await sut.get({
        filter: { secret_invite: mock.secret_invite },
      });
      expect(teamInvite).toEqual(mock);
    });

    it('should be return error when not found team invite', async () => {
      const mock = makeTeamInvite();

      const promise = sut.get({
        filter: { secret_invite: mock.secret_invite },
      });

      expect(promise).rejects.toThrow('Invite not found');
    });
  });
});
