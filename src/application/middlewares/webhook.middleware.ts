import { MiddlewareContract } from '@domain/contracts';
import { Http } from '@main/interfaces';

export class WebhookMiddleware implements MiddlewareContract {
  async handle(request: Http.Request): Promise<void | Error> {
    //
  }
}

export const webhookMiddleware = new WebhookMiddleware();
