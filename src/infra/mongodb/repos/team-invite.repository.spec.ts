import { makeTeamUser, makeTeamUsers } from '@domain/fakers';
import { TeamInvite, TeamUser } from '@domain/models';
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
    // it('should be create a team user tracking', async () => {});
  });
});
