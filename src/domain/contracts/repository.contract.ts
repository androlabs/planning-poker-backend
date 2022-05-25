/* eslint-disable @typescript-eslint/no-explicit-any */
export interface RepositoryContract<T> {
  create?: (data: T) => Promise<T | Error>;
  get?: (id: string | number) => Promise<T>;
  list?: (filter?: any) => Promise<T[]>;
  update?: (data: T, filter?: any) => Promise<T>;
  delete?: (id: string | number, filter: any) => Promise<boolean>;
}
