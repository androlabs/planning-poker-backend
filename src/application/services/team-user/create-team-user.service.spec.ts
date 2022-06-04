import { CreateTeamUserService } from '@application/services/team-user';
import {} from '@application/services/user';
import { makeTeamUser } from '@domain/fakers';
import { ITeamUserRepository } from '@domain/interfaces';
import { mock, MockProxy } from 'jest-mock-extended';

describe(CreateTeamUserService, () => {
  let sut: CreateTeamUserService;
  let teamUserRepository: MockProxy<ITeamUserRepository>;

  beforeEach(() => {
    teamUserRepository = mock<ITeamUserRepository>();
    sut = new CreateTeamUserService(teamUserRepository);
  });

  it('should be return create team user tracking', async () => {
    const mock = makeTeamUser();
    teamUserRepository.create.mockResolvedValueOnce(mock);

    const teamUser = await sut.perform(mock);

    expect(teamUser).toEqual(mock);
  });
});
