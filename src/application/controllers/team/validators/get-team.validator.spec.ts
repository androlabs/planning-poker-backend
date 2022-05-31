import { GetTeamValidator } from '@application/controllers/team/validators';
import { makeRequest } from '@domain/fakers';
import { Http } from '@main/interfaces';

describe(GetTeamValidator, () => {
  let sut: GetTeamValidator;
  let request: Http.Request;

  beforeEach(() => {
    sut = new GetTeamValidator();
    request = makeRequest();
  });

  it('should be validate request', async () => {
    request.params = { team_id: 'any_id' };

    const result = await sut.handle(request);

    expect(result).toBeUndefined();
  });

  it('should be return error validate request', async () => {
    request.params = {};

    try {
      await sut.handle(request);
    } catch (e: any) {
      expect(e.message).toEqual('Validation failed');
      expect(e.category).toEqual('FAILED_IN_VALIDATION_GET_TEAM');
      expect(e.status).toEqual(Http.StatusCode.BAD_REQUEST);
    }
  });
});
