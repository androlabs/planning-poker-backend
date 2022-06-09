import { ITeamRepository } from '@domain/interfaces';
import { Team } from '@domain/models';
import { GetTeamUseCase } from '@domain/use-cases';
import { makeTeamRepository } from '@infra/mongodb/repos';

export class GetTeamService implements GetTeamUseCase {
  constructor(private readonly teamRepository: ITeamRepository) {}

  async perform(id: string): Promise<Team> {
    return await this.teamRepository.get({ filter: { id } });
  }
}

/* istanbul ignore next */
export const makeGetTeamService = (): GetTeamService => {
  return new GetTeamService(makeTeamRepository());
};
