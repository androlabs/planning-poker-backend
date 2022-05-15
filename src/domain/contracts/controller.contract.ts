import { Http } from '@main/interfaces';

export interface ControllerContract {
  handle(request: Http.Request): Promise<Http.Response>;
}
