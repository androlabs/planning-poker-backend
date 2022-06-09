import { CreateTeamService } from '@application/services/team';
import { makeTeam } from '@domain/fakers';
import { ITeamRepository } from '@domain/interfaces';
import { mock, MockProxy } from 'jest-mock-extended';

describe(CreateTeamService, () => {
  let sut: CreateTeamService;
  let teamRepository: MockProxy<ITeamRepository>;

  beforeEach(() => {
    teamRepository = mock<ITeamRepository>();
    sut = new CreateTeamService(teamRepository);
  });

  it('should be return team created', async () => {
    const mock = makeTeam();
    teamRepository.create.mockResolvedValueOnce(mock);

    const team = await sut.perform(mock);

    expect(team).toEqual(mock);
  });
});
