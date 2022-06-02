import { BcryptService } from '@application/services/crypto';
import { CreateUserService } from '@application/services/user';
import { makeUser } from '@domain/fakers';
import { IUserRepository } from '@domain/interfaces';
import { mock, MockProxy } from 'jest-mock-extended';

describe(CreateUserService, () => {
  let sut: CreateUserService;
  let userRepository: MockProxy<IUserRepository>;
  let bcryptService: MockProxy<BcryptService>;

  beforeEach(() => {
    userRepository = mock<IUserRepository>();
    bcryptService = mock<BcryptService>();
    sut = new CreateUserService(userRepository, bcryptService);
  });

  it('should be return an user created', async () => {
    const mock = makeUser();
    userRepository.create.mockResolvedValueOnce(mock);
    bcryptService.hash.mockResolvedValueOnce(mock.password as string);

    const user = await sut.perform({ ...mock, password: 'strong_pass' });

    expect(user).toEqual(mock);
  });
});
