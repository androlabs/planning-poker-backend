import { HealthCheckController } from '@application/controllers/health-check';
import { env } from '@main/config/env';
import { Http } from '@main/interfaces';

describe('Name of the group', () => {
  let sut: HealthCheckController;

  beforeEach(() => {
    sut = new HealthCheckController();
  });

  it('should be return status ok server', async () => {
    const result = await sut.handle();

    expect(result).toEqual({
      statusCode: Http.StatusCode.OK,
      data: { live: true, domain: env.app.domain },
    });
  });
});
