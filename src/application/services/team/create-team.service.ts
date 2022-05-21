import { RepositoryContract } from '@domain/contracts';
import { Team } from '@domain/models';
import { CreateTeamUseCase } from '@domain/use-cases';
import { makeTeamRepository } from '@infra/mongodb/repos';

export class CreateTeamService implements CreateTeamUseCase {
  constructor(private readonly TeamRepository: RepositoryContract<Team>) {}

  async perform(Team: Team): Promise<Team> {
    return await this.TeamRepository.create(Team);
  }
}

export const makeCreateTeamService = (): CreateTeamService => {
  return new CreateTeamService(makeTeamRepository());
};
