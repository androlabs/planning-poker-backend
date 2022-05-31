import { makeUser } from '@domain/fakers';
import { Http } from '@main/interfaces';

export const makeRequest = (): Http.Request => {
  const user = makeUser();

  return {
    body: {},
    headers: {},
    params: {},
    path: '',
    query: {},
    user: {
      id: user.id as string,
      email: user.email,
      name: user.name,
    },
  };
};
