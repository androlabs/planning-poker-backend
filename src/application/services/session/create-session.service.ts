import { RepositoryContract } from '@domain/contracts';
import { Session } from '@domain/models';
import { CreateSessionUseCase } from '@domain/use-cases';
import { makeSessionRepository } from '@infra/mongodb/repos';

export class CreateSessionService implements CreateSessionUseCase {
  constructor(
    private readonly sessionRepository: RepositoryContract<Session>,
  ) {}

  async perform(session: Session): Promise<Session> {
    return await this.sessionRepository.create(session);
  }
}

export const makeCreateSessionService = (): CreateSessionService => {
  return new CreateSessionService(makeSessionRepository());
};
