import { HttpResponse } from '@main/interfaces';

export interface ControllerContract {
  handle(request: unknown): Promise<HttpResponse>;
}
