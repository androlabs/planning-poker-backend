import { ListTeamUserService } from '@application/services/team-user';
import { makeTeamUsers } from '@domain/fakers';
import { ITeamUserRepository } from '@domain/interfaces';
import { mock, MockProxy } from 'jest-mock-extended';

describe(ListTeamUserService, () => {
  let sut: ListTeamUserService;
  let teamUserRepository: MockProxy<ITeamUserRepository>;

  beforeEach(() => {
    teamUserRepository = mock<ITeamUserRepository>();
    sut = new ListTeamUserService(teamUserRepository);
  });

  it('should be return create team user tracking', async () => {
    const mock = makeTeamUsers(5);
    teamUserRepository.list.mockResolvedValueOnce(mock);

    const teamUser = await sut.perform({ filter: { team_id: 'any_team_id' } });

    expect(teamUser).toEqual(mock);
    expect(teamUserRepository.list).toHaveBeenCalledTimes(1);
  });
});
