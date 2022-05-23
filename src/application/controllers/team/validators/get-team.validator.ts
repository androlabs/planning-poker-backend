import { AppError } from '@application/middlewares/errors';
import { ValidatorContract } from '@domain/contracts';
import { Http } from '@main/interfaces';
import * as Yup from 'yup';

export const params = Yup.object().shape({
  team_id: Yup.string().required(),
});

export class GetTeamValidator implements ValidatorContract {
  async handle(request: Http.Request): Promise<void | Error> {
    try {
      await params.validate(request.params, {
        abortEarly: false,
      });
    } catch {
      throw new AppError({
        message: 'Validation failed',
        category: 'FAILED_IN_VALIDATION_GET_TEAM',
        status: 400,
      });
    }
  }
}

export const getTeamValidator = new GetTeamValidator();
