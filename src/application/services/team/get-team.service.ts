import { ITeamRepository } from '@domain/interfaces/team.repository';
import { Team } from '@domain/models';
import { GetTeamUseCase } from '@domain/use-cases';
import { makeTeamRepository } from '@infra/mongodb/repos';

export class GetTeamService implements GetTeamUseCase {
  constructor(private readonly teamRepository: ITeamRepository) {}

  async perform(id: string): Promise<Team> {
    return await this.teamRepository.get({ filter: { id } });
  }
}

export const makeGetTeamService = (): GetTeamService => {
  return new GetTeamService(makeTeamRepository());
};
