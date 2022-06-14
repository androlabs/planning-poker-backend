import { SecretTeamInvitesService } from '@application/services/crypto';
import { CreateTeamInviteService } from '@application/services/team-invite';
import { makeTeamInvite } from '@domain/fakers';
import { ITeamInviteRepository } from '@domain/interfaces';
import { mock, MockProxy } from 'jest-mock-extended';

describe(CreateTeamInviteService, () => {
  let sut: CreateTeamInviteService;
  let teamInviteRepository: MockProxy<ITeamInviteRepository>;
  let secretTeamInvitesService: MockProxy<SecretTeamInvitesService>;

  beforeEach(() => {
    teamInviteRepository = mock<ITeamInviteRepository>();
    secretTeamInvitesService = mock<SecretTeamInvitesService>();

    sut = new CreateTeamInviteService(
      teamInviteRepository,
      secretTeamInvitesService,
    );
  });

  it('should be create team invite', async () => {
    const mock = makeTeamInvite({
      team_id: 'any_team_id',
      who_invite: 'any_user_id',
    });

    teamInviteRepository.create.mockResolvedValueOnce(mock);

    const teamInvite = await sut.perform({
      teamId: 'any_team_id',
      whoInvite: 'any_user_id',
    });

    expect(teamInvite).toEqual(mock);
  });
});
