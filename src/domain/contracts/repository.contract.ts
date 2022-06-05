export namespace Repository {
  export type ParamsList = {
    filter?: any;
    fields?: string[];
    paginate?: {
      skip: number;
      limit: number;
    };
  };

  export type ParamsGet = {
    filter?: any;
    fields?: string[];
  };

  export type ParamsUpdate = {
    filter?: any;
  };

  export type ParamsDelete = {
    filter?: any;
  };
}
export interface RepositoryContract<T> {
  create?: (data: T) => Promise<T>;
  get?: (params: Repository.ParamsGet) => Promise<T>;
  list?: (params: Repository.ParamsList) => Promise<T[]>;
  count?: (params: Repository.ParamsList) => Promise<number>;
  update?: (data: T, filter: Repository.ParamsUpdate) => Promise<T>;
  delete?: (filter: Repository.ParamsDelete) => Promise<boolean>;
}
