import { AuthMiddleware } from '@application/middlewares';
import { TokenService } from '@application/services/auth';
import { makeRequest } from '@domain/fakers';
import { Http } from '@main/interfaces';
import { mock, MockProxy } from 'jest-mock-extended';

describe(AuthMiddleware, () => {
  let sut: AuthMiddleware;
  let tokenService: MockProxy<TokenService>;
  let request: Http.Request;
  const fakeToken = 'Bearer any_token';

  beforeEach(() => {
    tokenService = mock<TokenService>();
    sut = new AuthMiddleware(tokenService);
    request = makeRequest();
    request.headers = { authorization: fakeToken };
  });

  it('should validate bearer token', async () => {
    tokenService.verify.mockResolvedValueOnce(true);

    await sut.handle(request);

    expect(tokenService.verify).toHaveBeenCalledWith('any_token');
  });

  it('should return error in validate bearer token', async () => {
    tokenService.verify.mockRejectedValueOnce(new Error('Invalid token'));

    await sut.handle(request).catch((e) => {
      expect(e).toEqual({
        message: 'Failed in Auth',
        category: 'FAILED_IN_AUTH',
        messages: 'Invalid token',
        status: Http.StatusCode.BAD_REQUEST,
      });
    });
  });
});
