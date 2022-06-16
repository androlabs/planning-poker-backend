import { Repository } from '@domain/contracts';
import { ITeamUserRepository } from '@domain/interfaces';
import { TeamUser } from '@domain/models';
import { GetTeamUserUseCase } from '@domain/use-cases';
import { makeTeamUserRepository } from '@infra/mongodb/repos';

export class GetTeamUserService implements GetTeamUserUseCase {
  constructor(private readonly teamUserRepository: ITeamUserRepository) {}

  async perform(params: Repository.ParamsGet): Promise<TeamUser> {
    return await this.teamUserRepository.get(params);
  }
}

/* istanbul ignore next */
export const makeGetTeamUserService = (): GetTeamUserService => {
  return new GetTeamUserService(makeTeamUserRepository());
};
