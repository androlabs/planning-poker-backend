import { SignupValidator } from '@application/controllers/auth/validators';
import { makeRequest, makeUser } from '@domain/fakers';
import { Http } from '@main/interfaces';

describe(SignupValidator, () => {
  let sut: SignupValidator;
  let request: Http.Request;

  beforeEach(() => {
    sut = new SignupValidator();
    request = makeRequest();
  });

  it('should be validate signup request', async () => {
    const user = makeUser();
    request.body = { ...user };

    const result = await sut.handle(request);

    expect(result).toBeUndefined();
  });

  it('should be return error validate signup request', async () => {
    request.body = {};

    try {
      await sut.handle(request);
    } catch (e: any) {
      expect(e.message).toEqual('Validation failed');
      expect(e.category).toEqual('FAILED_IN_VALIDATION_SIGNUP');
      expect(e.status).toEqual(Http.StatusCode.BAD_REQUEST);
    }
  });
});
