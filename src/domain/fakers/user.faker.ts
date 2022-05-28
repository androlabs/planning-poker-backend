import { User } from '@domain/models';
import { faker } from '@faker-js/faker';

export const makeUser = (user?: {
  id?: string;
  name?: string;
  email?: string;
  password?: string;
}): User => {
  return {
    id: user?.id ?? faker.datatype.uuid(),
    email: user?.email ?? faker.internet.email(),
    name: user?.name ?? faker.name.firstName(),
    password: user?.password ?? faker.internet.password(),
  };
};

export const makeUsers = (count = 10): User[] => {
  return Array(count)
    .fill('')
    .map(() => makeUser());
};
