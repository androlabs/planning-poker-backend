import { makeUser, makeUsers } from '@domain/fakers';
import { User } from '@domain/models';
import { MongodbAdapter } from '@infra/adapters';
import { UserRepository } from '@infra/mongodb/repos';
import { mock, MockProxy } from 'jest-mock-extended';

describe(UserRepository, () => {
  let sut: UserRepository;
  let databaseAdapter: MockProxy<MongodbAdapter<User>>;

  beforeEach(() => {
    databaseAdapter = mock<MongodbAdapter<User>>();
    sut = new UserRepository(databaseAdapter);
  });

  describe('Create User', () => {
    it('should be return user created', async () => {
      const mock = makeUser({ name: 'Luke' });
      databaseAdapter.create.mockResolvedValueOnce(mock);

      const user = await sut.create(mock);
      delete mock.password;

      expect(user).toEqual(mock);
      expect(databaseAdapter.create).toHaveBeenCalledTimes(1);
    });

    it('should be error in user created', async () => {
      const mock = makeUser({ name: 'Luke' });
      databaseAdapter.create.mockRejectedValueOnce(new Error('generic error'));

      const promise = sut.create(mock);

      expect(promise).rejects.toThrow(new Error('generic error'));
      expect(databaseAdapter.create).toHaveBeenCalledTimes(1);
    });

    it('should be duplicate key error in user created', async () => {
      const mock = makeUser();
      databaseAdapter.create.mockRejectedValueOnce({ code: 11000 });

      const promise = sut.create(mock);

      expect(promise).rejects.toThrow();
      expect(databaseAdapter.create).toHaveBeenCalledTimes(1);
    });
  });

  describe('Get User', () => {
    it('should be return an user', async () => {
      const mock = makeUser();
      databaseAdapter.get.mockResolvedValueOnce(mock);

      const user = await sut.get({
        filter: { id: mock.id },
        fields: ['name', 'email'],
      });

      expect(user).toEqual(mock);
      expect(databaseAdapter.get).toHaveBeenCalledTimes(1);
    });

    it('should be return error when not found user', async () => {
      const mock = makeUser();
      const promise = sut.get({ filter: { id: mock.id } });

      expect(promise).rejects.toThrow('User not found');
      expect(databaseAdapter.get).toHaveBeenCalledTimes(1);
    });
  });

  describe('List users', () => {
    it('should be return array of users', async () => {
      const mock = makeUsers(15);
      databaseAdapter.list.mockResolvedValueOnce(mock);

      const users = await sut.list();

      expect(users).toHaveLength(15);
      expect(databaseAdapter.list).toHaveBeenCalledTimes(1);
    });
  });
});
