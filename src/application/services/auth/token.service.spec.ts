import { TokenService } from '@application/services/auth';
import { TokenAdapter } from '@infra/adapters';

describe(TokenService, () => {
  let sut: TokenService;
  let tokenAdapter: TokenAdapter;
  const email = 'major@email.com';

  beforeEach(() => {
    tokenAdapter = new TokenAdapter();
    sut = new TokenService(tokenAdapter);
  });

  it('should be generate token', async () => {
    const token = await sut.generate(email);

    expect(token.substring(0, 2)).toEqual('ey');
  });

  it('should be decode token', async () => {
    const token = await sut.generate(email);
    const decode = await sut.decode(token);

    expect(decode.email).toEqual(email);
    expect(decode).toHaveProperty('iat');
    expect(decode).toHaveProperty('exp');
  });

  it('should be decode token', async () => {
    const token = await sut.generate(email);

    const result = await sut.verify(token);

    expect(result).toBeTruthy();
  });
});
