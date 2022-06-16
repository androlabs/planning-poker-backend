import { MeController } from '../../../src/application/controllers/auth';
import { TokenService } from '@application/services/auth';
import { GetUserService } from '../../../src/application/services/user';
import { makeBearerAuthToken, makeRequest, makeUser } from '../../../src/domain/fakers';
import { Http } from '../../../src/main/interfaces';
import { mock, MockProxy } from 'jest-mock-extended';

describe(MeController, () => {
  let sut: MeController;
  let tokenService: MockProxy<TokenService>;
  let getUserService: MockProxy<GetUserService>;
  let request: Http.Request;

  beforeEach(() => {
    getUserService = mock<GetUserService>();
    tokenService = mock<TokenService>();
    sut = new MeController(tokenService, getUserService);

    request = makeRequest();
    request.headers = { authorization: makeBearerAuthToken() };
  });

  it('should be return access token user logged', async () => {
    const user = makeUser();
    getUserService.perform.mockResolvedValueOnce(user);
    tokenService.decode.mockResolvedValueOnce({ email: 'admin@email.com' });

    const response = await sut.handle(request);

    expect(response).toEqual({
      statusCode: Http.StatusCode.OK,
      data: user,
    });
  });
});
