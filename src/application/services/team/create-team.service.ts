import { ITeamRepository } from '@domain/interfaces/team.repository';
import { Team } from '@domain/models';
import { CreateTeamUseCase } from '@domain/use-cases';
import { makeTeamRepository } from '@infra/mongodb/repos';

export class CreateTeamService implements CreateTeamUseCase {
  constructor(private readonly teamRepository: ITeamRepository) {}

  async perform(team: Team): Promise<Team> {
    return await this.teamRepository.create(team);
  }
}

/* istanbul ignore next */
export const makeCreateTeamService = (): CreateTeamService => {
  return new CreateTeamService(makeTeamRepository());
};
