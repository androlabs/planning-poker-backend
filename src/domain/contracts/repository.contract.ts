export interface RepositoryContract<T> {
  create(data: T): Promise<T>;
  get(id: string | number): Promise<T>;
  update(data: T): Promise<T>;
  delete(id: string | number): Promise<boolean>;
}
