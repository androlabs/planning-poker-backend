export namespace Http {
  export type Request = {
    body: unknown;
    params: unknown;
    query: unknown;
    headers: unknown;
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
    NOT_FOUND = 404,
    FORBIDDEN = 403,
    SERVER_ERROR = 500,
  }

  export enum Category {
    error = 'ERROR',
  }

  export type Error = {
    message: string;
    category: Category;
    messages: string[] | Record<string, unknown>;
    status: StatusCode;
  };
}
