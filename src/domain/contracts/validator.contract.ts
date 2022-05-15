import { Http } from '@main/interfaces';

export interface ValidatorContract {
  handle(request: Http.Request): Promise<Error | void>;
}
