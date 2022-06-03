import { ITeamUserRepository } from '@domain/interfaces';
import { TeamUser } from '@domain/models';
import { CreateTeamUserUseCase } from '@domain/use-cases';
import { makeTeamUserRepository } from '@infra/mongodb/repos';

export class CreateTeamUserService implements CreateTeamUserUseCase {
  constructor(private readonly teamUserRepository: ITeamUserRepository) {}

  async perform(teamUser: TeamUser): Promise<TeamUser> {
    return await this.teamUserRepository.create(teamUser);
  }
}

/* istanbul ignore next */
export const makeCreateTeamUserService = (): CreateTeamUserService => {
  return new CreateTeamUserService(makeTeamUserRepository());
};
