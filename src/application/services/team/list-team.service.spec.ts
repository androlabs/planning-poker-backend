import { ListTeamService } from '@application/services/team';
import { makeTeams } from '@domain/fakers';
import { ITeamRepository } from '@domain/interfaces/team.repository';
import { mock, MockProxy } from 'jest-mock-extended';

describe(ListTeamService, () => {
  let sut: ListTeamService;
  let teamRepository: MockProxy<ITeamRepository>;

  beforeEach(() => {
    teamRepository = mock<ITeamRepository>();
    sut = new ListTeamService(teamRepository);
  });

  it('should be return teams', async () => {
    const mock = makeTeams(5);
    teamRepository.list.mockResolvedValueOnce(mock);

    const teams = await sut.perform({});

    expect(teams).toEqual(mock);
  });
});
