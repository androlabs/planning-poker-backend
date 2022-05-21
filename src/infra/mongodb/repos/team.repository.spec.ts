import { mock, MockProxy } from 'jest-mock-extended';

import { TeamRepository } from './team.repository';

describe(TeamRepository, () => {
  let sut: MockProxy<TeamRepository>;

  beforeEach(() => {
    sut = mock<TeamRepository>();
  });

  it('should be create a team', async () => {
    const mock = { id: 'jk12h3k1j23', name: 'Jedi Squad' };
    sut.create.mockResolvedValueOnce(mock);

    const team = await sut.create({
      name: mock.name,
    });

    expect(team).toEqual(mock);
  });

  it('should be return a team by id', async () => {
    sut.get.mockResolvedValueOnce({ id: 'any_id', name: 'Generic Team' });

    const team = await sut.get('any_id');

    expect(team.id).toEqual('any_id');
  });
});
