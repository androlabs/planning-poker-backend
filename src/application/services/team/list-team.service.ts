import { Repository } from '@domain/contracts';
import { ITeamRepository } from '@domain/interfaces/team.repository';
import { Team } from '@domain/models';
import { ListTeamUseCase } from '@domain/use-cases';
import { makeTeamRepository } from '@infra/mongodb/repos';

export class ListTeamService implements ListTeamUseCase {
  constructor(private readonly teamRepository: ITeamRepository) {}

  async perform(params: Repository.ParamsList): Promise<Team[]> {
    return await this.teamRepository.list(params);
  }
}

/* istanbul ignore next */
export const makeListTeamService = (): ListTeamService => {
  return new ListTeamService(makeTeamRepository());
};
