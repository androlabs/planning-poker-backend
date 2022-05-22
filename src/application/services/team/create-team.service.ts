import { Team } from '@domain/models';
import { CreateTeamUseCase } from '@domain/use-cases';
import { makeTeamRepository, TeamRepository } from '@infra/mongodb/repos';

export class CreateTeamService implements CreateTeamUseCase {
  constructor(private readonly teamRepository: TeamRepository) {}

  async perform(team: Team): Promise<Team> {
    return await this.teamRepository.create(team);
  }
}

export const makeCreateTeamService = (): CreateTeamService => {
  return new CreateTeamService(makeTeamRepository());
};
