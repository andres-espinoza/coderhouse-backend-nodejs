export interface CRUD<T> {
  create: (resource: T) => Promise<T>;
  readById: (id: string) => Promise<T>;
  readAll: () => Promise<T>;
  updateById: (id: string, resource: T) => Promise<string>;
  deleteById: (id: string) => Promise<string>;
}
