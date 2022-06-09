import { SecretTeamInvitesService } from '@application/services/crypto';

describe(SecretTeamInvitesService, () => {
  let sut: SecretTeamInvitesService;

  beforeEach(() => {
    sut = new SecretTeamInvitesService();
  });

  it('should be generate secret', () => {
    const secret = sut.perform({
      expires: new Date('2022-01-01').getTime(),
      teamId: 'e90fb36e-e06b-4cee-b4cd-830d1b0aacb8',
      whoInvite: 'aa02cea6-a333-4adf-9ac8-438aa8df6ea7',
    });

    expect(secret).toEqual('2747ea8cf081bccaf39ac7e0');
  });
});
