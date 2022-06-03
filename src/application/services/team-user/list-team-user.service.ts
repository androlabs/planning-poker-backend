import { Repository } from '@domain/contracts';
import { ITeamUserRepository } from '@domain/interfaces';
import { TeamUser } from '@domain/models';
import { ListTeamUserUseCase } from '@domain/use-cases';
import { makeTeamUserRepository } from '@infra/mongodb/repos';

export class ListTeamUserService implements ListTeamUserUseCase {
  constructor(private readonly teamUserRepository: ITeamUserRepository) {}

  async perform(params: Repository.ParamsList): Promise<TeamUser[]> {
    return await this.teamUserRepository.list(params);
  }
}

/* istanbul ignore next */
export const makeListTeamUserService = (): ListTeamUserService => {
  return new ListTeamUserService(makeTeamUserRepository());
};
