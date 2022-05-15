import { MiddlewareContract } from '@domain/contracts';
import { Http } from '@main/interfaces';

export class WebhookMiddleware implements MiddlewareContract {
  async handle(request: Http.Request): Promise<void | Error> {
    console.log('WEBHOOK MIDDLWARE');
    // throw new Error('Error Middleware');
  }
}

export const webhookMiddleware = new WebhookMiddleware();
