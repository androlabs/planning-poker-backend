import { LoginController } from '../../../src/application/controllers/auth';
import {
  BasicAuthLoginService,
  TokenService,
} from '@application/services/auth';
import {
  makeBasicAuthToken,
  makeBearerAuthToken,
  makeRequest,
  makeUser,
} from '../../../src/domain/fakers';
import { Http } from '../../../src/main/interfaces';
import { mock, MockProxy } from 'jest-mock-extended';

describe(LoginController, () => {
  let sut: LoginController;
  let basicAuthLoginService: MockProxy<BasicAuthLoginService>;
  let tokenService: MockProxy<TokenService>;
  let request: Http.Request;

  beforeEach(() => {
    basicAuthLoginService = mock<BasicAuthLoginService>();
    tokenService = mock<TokenService>();
    sut = new LoginController(basicAuthLoginService, tokenService);

    request = makeRequest();
    request.headers = { authorization: makeBasicAuthToken() };
  });

  it('should be return access token user logged', async () => {
    basicAuthLoginService.perform.mockResolvedValueOnce(makeUser());
    tokenService.generate.mockResolvedValueOnce(makeBearerAuthToken());

    const response = await sut.handle(request);

    expect(response).toEqual({
      statusCode: Http.StatusCode.OK,
      data: { accessToken: makeBearerAuthToken() },
    });
  });

  it('should be return error in login basic auth', async () => {
    basicAuthLoginService.perform.mockRejectedValueOnce(new Error('Invalid'));

    await sut.handle(request).catch((e) => {
      expect(e).toEqual({
        message: 'Failed in Login',
        category: 'FAILED_IN_BASIC_LOGIN',
        status: Http.StatusCode.BAD_REQUEST,
        messages: 'Invalid',
      });
    });
  });
});
