import { HttpResponse } from '@main/interfaces';

export interface MiddlewareContract {
  handle(request: unknown): Promise<HttpResponse>;
}
