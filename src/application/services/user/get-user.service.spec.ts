import { GetUserService } from '@application/services/user';
import { makeUser } from '@domain/fakers';
import { IUserRepository } from '@domain/interfaces';
import { mock, MockProxy } from 'jest-mock-extended';

describe(GetUserService, () => {
  let sut: GetUserService;
  let userRepository: MockProxy<IUserRepository>;

  beforeEach(() => {
    userRepository = mock<IUserRepository>();
    sut = new GetUserService(userRepository);
  });

  it('should be return an user created', async () => {
    const mock = makeUser();
    userRepository.get.mockResolvedValueOnce(mock);

    const user = await sut.perform({ filter: { id: mock.id } });

    expect(user).toEqual(mock);
  });
});
