import { ListUserService } from '@application/services/user';
import { makeUsers } from '@domain/fakers';
import { IUserRepository } from '@domain/interfaces';
import { mock, MockProxy } from 'jest-mock-extended';

describe(ListUserService, () => {
  let sut: ListUserService;
  let userRepository: MockProxy<IUserRepository>;

  beforeEach(() => {
    userRepository = mock<IUserRepository>();
    sut = new ListUserService(userRepository);
  });

  it('should be return users', async () => {
    const mock = makeUsers();
    userRepository.list.mockResolvedValueOnce(mock);

    const user = await sut.perform({});

    expect(user).toEqual(mock);
  });
});
