import { AppError } from '@application/middlewares/errors';
import { ValidatorContract } from '@domain/contracts';
import { Http } from '@main/interfaces';
import * as Yup from 'yup';

export const headers = Yup.object().shape({
  authorization: Yup.string().required(),
});

export class AuthValidator implements ValidatorContract {
  async handle(request: Http.Request): Promise<void | Error> {
    try {
      await headers.validate(request.headers, {
        abortEarly: false,
      });
    } catch (e) {
      throw new AppError({
        message: 'Validation failed',
        category: 'FAILED_IN_VALIDATION_AUTH',
        status: Http.StatusCode.BAD_REQUEST,
        messages: e,
      });
    }
  }
}

/* istanbul ignore next */
export const authValidator = new AuthValidator();
