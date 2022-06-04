import { AppError } from '@application/middlewares/errors';
import { Http } from '@main/interfaces';

describe(AppError, () => {
  it('should return instance custom app error', () => {
    const instance = new AppError({
      message: 'Generic Error Message',
      category: 'ANY_ERROR',
      messages: ['Message error 01', 'Message error 02'],
      status: Http.StatusCode.BAD_REQUEST,
    });

    expect(instance).toBeInstanceOf(AppError);
  });

  it('should return instance custom app error with default values', () => {
    const instance = new AppError({
      message: 'Generic Error Message',
      category: 'ANY_ERROR',
    });

    expect(instance).toBeInstanceOf(AppError);
    expect(instance.messages).toEqual({});
    expect(instance.status).toEqual(Http.StatusCode.BAD_REQUEST);
  });
});
