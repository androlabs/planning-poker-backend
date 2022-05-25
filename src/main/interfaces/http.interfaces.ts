export namespace Http {
  export type Request = {
    user: {
      id: string;
      name: string;
      email: string;
    };
    body: Record<string, string>;
    params: Record<string, string>;
    query: Record<string, unknown>;
    headers: Record<any, any>;
    path: unknown;
  };

  export type Response<T = unknown> = {
    statusCode: number;
    data?: T;
  };

  export enum Methods {
    get = 'get',
    post = 'post',
    delete = 'delete',
    put = 'put',
    patch = 'patch',
  }

  export enum StatusCode {
    OK = 200,
    CREATED = 201,
    NO_CONTENT = 204,
    BAD_REQUEST = 400,
    NOT_FOUND = 404,
    FORBIDDEN = 403,
    SERVER_ERROR = 500,
  }

  export type Error = {
    message: string;
    category: string;
    messages?: Record<string, unknown> | any;
    status?: StatusCode;
  };
}
