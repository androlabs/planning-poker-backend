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

export const makeBasicAuthToken = (): string =>
  'Basic YWRtaW5AdGVzdC5jb206c3Ryb25ncGFzcw==';

export const makeBearerAuthToken = (): string =>
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGVtYWlsLmNvbSIsImlhdCI6MTY1MzUyMjE2OCwiZXhwIjoxNjU0MTI2OTY4fQ.tOi1FSCzImduCzLf9m2WtQ1Qr2Ld0x2z9qEwjoQlLPI';
