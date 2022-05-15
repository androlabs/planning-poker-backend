import { AppError } from '@application/middlewares/errors';
import { ValidatorContract } from '@domain/contracts';
import { Http } from '@main/interfaces';
import * as Yup from 'yup';

export const queryParams = Yup.object().shape({
  page: Yup.string().required(),
  limit: Yup.number(),
});

export class GetExampleValidator implements ValidatorContract {
  async handle(request: Http.Request): Promise<void | Error> {
    try {
      await queryParams.validate(request.query, {
        abortEarly: false,
      });

      if (!request.query.limit) request.query.limit = '50';
    } catch {
      throw new AppError({
        message: 'Validation failed',
        category: 'GET_EXAMPLE_FAILURE',
        status: 400,
      });
    }
  }
}

export const getExampleValidator = new GetExampleValidator();
