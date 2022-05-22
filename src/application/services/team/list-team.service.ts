import { Team } from '@domain/models';
import { ListTeamUseCase } from '@domain/use-cases';
import { makeTeamRepository, TeamRepository } from '@infra/mongodb/repos';

export class ListTeamService implements ListTeamUseCase {
  constructor(private readonly teamRepository: TeamRepository) {}

  async perform(userId: string): Promise<Team[]> {
    return await this.teamRepository.list();
  }
}

export const makeListTeamService = (): ListTeamService => {
  return new ListTeamService(makeTeamRepository());
};
