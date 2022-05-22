import { Team } from '@domain/models';
import { CreateTeamUseCase } from '@domain/use-cases';
import { makeTeamRepository, TeamRepository } from '@infra/mongodb/repos';

export class CreateTeamService implements CreateTeamUseCase {
  constructor(private readonly teamRepository: TeamRepository) {}

  async perform(Team: Team): Promise<Team> {
    return await this.teamRepository.create(Team);
  }
}

export const makeCreateTeamService = (): CreateTeamService => {
  return new CreateTeamService(makeTeamRepository());
};
