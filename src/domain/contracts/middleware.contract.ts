import { Http } from '@main/interfaces';

export interface MiddlewareContract {
  handle(request: Http.Request): Promise<void>;
}
