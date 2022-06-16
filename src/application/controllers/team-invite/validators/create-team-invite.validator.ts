import { AppError } from '@application/middlewares/errors';
import { ValidatorContract } from '@domain/contracts';
import { Http } from '@main/interfaces';
import * as Yup from 'yup';

const params = Yup.object().shape({
  team_id: Yup.string().uuid().required(),
});

export class CreateTeamInviteValidator implements ValidatorContract {
  async handle(request: Http.Request): Promise<void | Error> {
    try {
      await params.validate(request.params, {
        abortEarly: false,
      });
    } catch (e) {
      throw new AppError({
        message: 'Validation failed',
        category: 'FAILED_IN_VALIDATION_CREATE_TEAM_INVITE',
        status: Http.StatusCode.BAD_REQUEST,
        messages: e,
      });
    }
  }
}

export const createTeamInviteValidator = new CreateTeamInviteValidator();
