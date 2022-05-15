import { ControllerContract } from '@domain/contracts';
import { MiddlewareContract } from '@domain/contracts/middleware.contract';

export type RouterMapper = {
  endPoint: string;
  method: MethodsHttp;
  controller: ControllerContract;
  middlewares: MiddlewareContract[];
};

export type HttpResponse<T = unknown> = {
  statusCode: number;
  data?: T;
};

export enum MethodsHttp {
  get = 'get',
  post = 'post',
  delete = 'delete',
  put = 'put',
  patch = 'patch',
}
