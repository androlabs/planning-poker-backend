import { SignupController } from '../../../src/application/controllers/auth';
import { TokenService } from '@application/services/auth';
import { CreateUserService } from '../../../src/application/services/user';
import { makeBearerAuthToken, makeRequest, makeUser } from '../../../src/domain/fakers';
import { Http } from '../../../src/main/interfaces';
import { mock, MockProxy } from 'jest-mock-extended';

describe(SignupController, () => {
  let sut: SignupController;
  let userCreateService: MockProxy<CreateUserService>;
  let tokenService: MockProxy<TokenService>;
  let request: Http.Request;

  beforeEach(() => {
    userCreateService = mock<CreateUserService>();
    tokenService = mock<TokenService>();
    sut = new SignupController(userCreateService, tokenService);

    request = makeRequest();
    request.headers = { authorization: makeBearerAuthToken() };
  });

  it('should be return user created in signup', async () => {
    const user = makeUser();

    userCreateService.perform.mockResolvedValueOnce(user);
    tokenService.generate.mockResolvedValueOnce(makeBearerAuthToken());

    const response = await sut.handle(request);

    expect(response).toEqual({
      statusCode: Http.StatusCode.CREATED,
      data: { user, accessToken: makeBearerAuthToken() },
    });
  });

  it('should be return error when failed', async () => {
    userCreateService.perform.mockRejectedValueOnce(new Error('Failed'));

    await sut.handle(request).catch((e) => {
      expect(e).toEqual({
        message: 'Failed in Signup',
        category: 'FAILED_IN_SIGNUP',
        status: Http.StatusCode.BAD_REQUEST,
        messages: 'Failed',
      });
    });
  });
});
