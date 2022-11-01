export interface GenericDAO<T> {
  create(resource: T): Promise<T>;
  getById(id: number | string): Promise<T | any>;
  getAll(): Promise<T[]>;
  updateById(id: string | number, resource: any): Promise<string>;
  deleteById(id: string | number): Promise<string>;
}
