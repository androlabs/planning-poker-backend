import { ITeamRepository } from '@domain/interfaces/team.repository';
import { Team } from '@domain/models';
import { ListTeamUseCase } from '@domain/use-cases';
import { makeTeamRepository } from '@infra/mongodb/repos';

export class ListTeamService implements ListTeamUseCase {
  constructor(private readonly teamRepository: ITeamRepository) {}

  async perform(teamsId: string): Promise<Team[]> {
    return await this.teamRepository.list({});
  }
}

export const makeListTeamService = (): ListTeamService => {
  return new ListTeamService(makeTeamRepository());
};
