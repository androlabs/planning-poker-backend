import { BcryptAdapter } from '../../../src/infra/adapters';
import { mock, MockProxy } from 'jest-mock-extended';

describe(BcryptAdapter, () => {
  let bcryptAdapter: MockProxy<BcryptAdapter>;
  const hashMock = '$2a$12$R9h/cIPz0gi.URNNX3kh2OPST9/PgBkqquzi.Ss7KIUgO2t0jWMUW';

  it('should be return hashed content', async () => {
    // bcryptAdapter.hash.mockResolvedValueOnce(hashMock);
    // const hash = await sut.hash('jedi_is_better');
    //
    // expect(hash).toBe(hashMock);
  });

  it('should be return hashed content', async () => {
    // bcryptAdapter.compare.mockResolvedValueOnce(true);
    //
    // expect(await sut.compare('jedi_is_better', hashMock)).toBeTruthy();
  });
});
