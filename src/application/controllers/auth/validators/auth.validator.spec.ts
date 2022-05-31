import { AuthValidator } from '@application/controllers/auth/validators';
import { makeRequest } from '@domain/fakers';
import { Http } from '@main/interfaces';

describe(AuthValidator, () => {
  let sut: AuthValidator;
  let request: Http.Request;

  beforeEach(() => {
    sut = new AuthValidator();
    request = makeRequest();
  });

  it('should be validate auth request', async () => {
    request.headers = { authorization: 'Bearer any_token' };

    const result = await sut.handle(request);

    expect(result).toBeUndefined();
  });

  it('should be return error validate auth request', async () => {
    request.headers = {};

    try {
      await sut.handle(request);
    } catch (e: any) {
      expect(e.message).toEqual('Validation failed');
      expect(e.category).toEqual('FAILED_IN_VALIDATION_AUTH');
      expect(e.status).toEqual(Http.StatusCode.BAD_REQUEST);
    }
  });
});
