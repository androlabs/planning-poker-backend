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
    } catch (err: any) {
      throw new Error('VALIDATION ERROR');
      // throw new AppError({
      //   message: 'Validation failed',
      //   category: 'GET_EMPLOYEES_BY_COMPANY_VALIDATION_FAILURE',
      //   messages: err.inner,
      // });
    }
  }
}

export const getExampleValidator = new GetExampleValidator();
