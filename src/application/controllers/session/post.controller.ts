import { AppError } from '@application/middlewares/errors';
import {
  CreateSessionService,
  makeCreateSessionService,
} from '@application/services/session';
import { ControllerContract } from '@domain/contracts';
import { Http } from '@main/interfaces';

class SessionCreateController implements ControllerContract {
  constructor(private readonly createSessionService: CreateSessionService) {}

  async handle(request: Http.Request): Promise<Http.Response> {
    const { body } = request;

    try {
      const session = await this.createSessionService.perform({
        name: body.name,
      });

      return {
        statusCode: 201,
        data: session,
      };
    } catch (e) {
      throw new AppError({
        category: 'FAILURE_CREATE_SESSION',
        message: 'Failed in create session',
      });
    }
  }
}

export const makeSessionCreateController = (): SessionCreateController => {
  return new SessionCreateController(makeCreateSessionService());
};
