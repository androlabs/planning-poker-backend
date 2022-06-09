import { GetTeamService } from '@application/services/team';
import { makeTeam } from '@domain/fakers';
import { ITeamRepository } from '@domain/interfaces';
import { mock, MockProxy } from 'jest-mock-extended';

describe(GetTeamService, () => {
  let sut: GetTeamService;
  let teamRepository: MockProxy<ITeamRepository>;

  beforeEach(() => {
    teamRepository = mock<ITeamRepository>();
    sut = new GetTeamService(teamRepository);
  });

  it('should be return team by id', async () => {
    const mock = makeTeam();
    teamRepository.get.mockResolvedValueOnce(mock);

    const team = await sut.perform(mock.id as string);

    expect(team).toEqual(mock);
  });
});
