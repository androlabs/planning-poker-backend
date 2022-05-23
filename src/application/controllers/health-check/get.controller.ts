import { ControllerContract } from '@domain/contracts';
import { env } from '@main/config/env';
import { Http } from '@main/interfaces';

class HealthCheckController implements ControllerContract {
  async handle(): Promise<Http.Response> {
    return {
      statusCode: Http.StatusCode.OK,
      data: {
        live: true,
        domain: env.app.domain,
      },
    };
  }
}

export const makeHeathCheckController = (): HealthCheckController => {
  return new HealthCheckController();
};
