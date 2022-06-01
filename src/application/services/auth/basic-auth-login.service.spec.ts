import { BasicAuthLoginService } from '@application/services/auth';
import { BcryptService } from '@application/services/crypto';
import { makeUser } from '@domain/fakers';
import { IUserRepository } from '@domain/interfaces';
import { mock, MockProxy } from 'jest-mock-extended';

describe(BasicAuthLoginService, () => {
  let sut: BasicAuthLoginService;
  let userRepository: MockProxy<IUserRepository>;
  let bcryptService: MockProxy<BcryptService>;
  const fakeToken = 'Basic YWRtaW5AdGVzdC5jb206c3Ryb25ncGFzcw==';

  beforeEach(() => {
    userRepository = mock<IUserRepository>();
    bcryptService = mock<BcryptService>();
    sut = new BasicAuthLoginService(userRepository, bcryptService);
  });

  it('should validate basic auth user', async () => {
    const email = 'admin@test.com';

    userRepository.get.mockResolvedValueOnce(makeUser({ email }));
    bcryptService.compare.mockResolvedValueOnce(true);

    await sut.perform(fakeToken);

    expect(userRepository.get).toHaveBeenCalledWith({
      fields: ['email', 'password'],
      filter: { email },
    });
  });

  it('should be return error when validate basic auth user', async () => {
    const email = 'admin@test.com';

    userRepository.get.mockResolvedValueOnce(makeUser({ email }));
    bcryptService.compare.mockResolvedValueOnce(false);

    const promise = sut.perform(fakeToken);

    expect(promise).rejects.toThrow(new Error('Password is incorrect'));
  });
});
