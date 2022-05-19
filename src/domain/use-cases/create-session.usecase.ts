import { Session } from '@domain/models';

export interface CreateSessionUseCase {
  perform(session: Session): Promise<Session>;
}
