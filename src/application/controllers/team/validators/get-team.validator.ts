import { AppError } from '@application/middlewares/errors';
import { ValidatorContract } from '@domain/contracts';
import { Http } from '@main/interfaces';
import * as Yup from 'yup';

const params = Yup.object().shape({
  team_id: Yup.string().required(),
});

export class GetTeamValidator implements ValidatorContract {
  async handle(request: Http.Request): Promise<void | Error> {
    try {
      await params.validate(request.params, {
        abortEarly: false,
      });
    } catch (e) {
      throw new AppError({
        message: 'Validation failed',
        category: 'FAILED_IN_VALIDATION_GET_TEAM',
        status: Http.StatusCode.BAD_REQUEST,
        messages: e,
      });
    }
  }
}

export const getTeamValidator = new GetTeamValidator();
