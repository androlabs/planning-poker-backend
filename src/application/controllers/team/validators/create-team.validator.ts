import { AppError } from '@application/middlewares/errors';
import { ValidatorContract } from '@domain/contracts';
import { Http } from '@main/interfaces';
import * as Yup from 'yup';

export const body = Yup.object().shape({
  name: Yup.string().required(),
});

export class CreateTeamValidator implements ValidatorContract {
  async handle(request: Http.Request): Promise<void | Error> {
    try {
      await body.validate(request.body, {
        abortEarly: false,
      });
    } catch {
      throw new AppError({
        message: 'Validation failed',
        category: 'FAILED_IN_VALIDATION_CREATE_TEAM',
        status: 400,
      });
    }
  }
}

export const createTeamValidator = new CreateTeamValidator();
