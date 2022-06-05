import { Repository } from '@domain/contracts';
import { ITeamRepository } from '@domain/interfaces/team.repository';
import { Team } from '@domain/models';
import { UpdateTeamUseCase } from '@domain/use-cases';
import { makeTeamRepository } from '@infra/mongodb/repos';

export class UpdateTeamService implements UpdateTeamUseCase {
  constructor(private readonly teamRepository: ITeamRepository) {}

  async perform(data: Team, filter: Repository.ParamsUpdate): Promise<Team> {
    return this.teamRepository.update(data, filter);
  }
}

/* istanbul ignore next */
export const makeUpdateTeamService = (): UpdateTeamService => {
  return new UpdateTeamService(makeTeamRepository());
};
