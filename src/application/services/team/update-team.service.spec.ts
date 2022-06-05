import { UpdateTeamService } from '@application/services/team';
import { makeTeam } from '@domain/fakers';
import { ITeamRepository } from '@domain/interfaces/team.repository';
import { mock, MockProxy } from 'jest-mock-extended';

describe(UpdateTeamService, () => {
  let sut: UpdateTeamService;
  let teamRepository: MockProxy<ITeamRepository>;

  beforeEach(() => {
    teamRepository = mock<ITeamRepository>();
    sut = new UpdateTeamService(teamRepository);
  });

  it('should be update team', async () => {
    const mock = makeTeam({ id: 'any_team_id', name: 'Squad Bravo' });
    teamRepository.update.mockResolvedValueOnce(mock);

    const teamUpdated = await sut.perform(
      { name: 'Squad Bravo' },
      { filter: { id: 'any_team_id' } },
    );

    expect(teamUpdated).toEqual(mock);
  });
});
