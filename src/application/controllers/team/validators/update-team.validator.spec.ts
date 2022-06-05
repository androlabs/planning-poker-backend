import { UpdateTeamValidator } from '@application/controllers/team/validators';
import { makeRequest } from '@domain/fakers';
import { Http } from '@main/interfaces';

describe(UpdateTeamValidator, () => {
  let sut: UpdateTeamValidator;
  let request: Http.Request;

  beforeEach(() => {
    sut = new UpdateTeamValidator();
    request = makeRequest();
  });

  it('should be validate request', async () => {
    request.params = { team_id: 'any_id' };
    request.body = { name: 'Squad B' };

    const result = await sut.handle(request);

    expect(result).toBeUndefined();
  });

  it('should be return error validate request', async () => {
    request.params = {};

    await sut.handle(request).catch((e) => {
      expect(e.category).toEqual('FAILED_IN_VALIDATION_UPDATE_TEAM');
      expect(e.status).toEqual(Http.StatusCode.BAD_REQUEST);
    });
  });
});
