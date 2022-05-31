import { CreateTeamValidator } from '@application/controllers/team/validators';
import { makeRequest } from '@domain/fakers';
import { Http } from '@main/interfaces';

describe(CreateTeamValidator, () => {
  let sut: CreateTeamValidator;
  let request: Http.Request;

  beforeEach(() => {
    sut = new CreateTeamValidator();
    request = makeRequest();
  });

  it('should be validate request', async () => {
    request.body = { name: 'Jedi Squad' };

    const result = await sut.handle(request);

    expect(result).toBeUndefined();
  });

  it('should be return error validate request', async () => {
    request.body = {};

    try {
      await sut.handle(request);
    } catch (e: any) {
      expect(e.message).toEqual('Validation failed');
      expect(e.category).toEqual('FAILED_IN_VALIDATION_CREATE_TEAM');
      expect(e.status).toEqual(Http.StatusCode.BAD_REQUEST);
    }
  });
});
