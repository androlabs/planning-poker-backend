import { ContextUserMiddleware } from '@application/middlewares';
import { TokenService } from '@application/services/auth';
import { GetUserService } from '@application/services/user';
import { makeRequest, makeUser } from '@domain/fakers';
import { Http } from '@main/interfaces';
import { mock, MockProxy } from 'jest-mock-extended';

describe(ContextUserMiddleware, () => {
  let sut: ContextUserMiddleware;
  let tokenService: MockProxy<TokenService>;
  let getUserService: MockProxy<GetUserService>;

  let request: Http.Request;
  const fakeToken = 'Bearer any_token';

  beforeEach(() => {
    tokenService = mock<TokenService>();
    getUserService = mock<GetUserService>();
    sut = new ContextUserMiddleware(tokenService, getUserService);

    request = makeRequest();
    request.headers = { authorization: fakeToken };
  });

  it('should be get user context request', async () => {
    const email = 'luke@starwars.com.br';

    tokenService.verify.mockResolvedValueOnce(true);
    tokenService.decode.mockResolvedValueOnce({ email });
    getUserService.perform.mockResolvedValueOnce(makeUser({ email }));

    await sut.handle(request);

    expect(tokenService.decode).toHaveBeenCalledWith('any_token');
    expect(getUserService.perform).toHaveBeenCalledWith({
      filter: { email },
    });
  });

  it('should return in get user context request', async () => {
    const email = 'luke@starwars.com.br';

    tokenService.verify.mockResolvedValueOnce(true);
    tokenService.decode.mockResolvedValueOnce({ email });
    getUserService.perform.mockRejectedValueOnce(new Error('User not found'));

    await sut.handle(request).catch((e) => {
      expect(e).toEqual({
        message: 'Failed in get user context request',
        category: 'FAILED_IN_AUTH',
        messages: 'User not found',
        status: Http.StatusCode.BAD_REQUEST,
      });
    });
  });
});
