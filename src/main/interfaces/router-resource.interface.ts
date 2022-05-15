import {
  ControllerContract,
  MiddlewareContract,
  ValidatorContract,
} from '@domain/contracts';
import { Http } from '@main/interfaces';

export type RouterMapper = {
  endPoint: string;
  method: Http.Methods;
  controller: ControllerContract;
  middlewares?: ValidatorContract[] & MiddlewareContract[];
};
