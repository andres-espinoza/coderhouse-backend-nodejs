export interface GenericDAO<T> {
  create(model: T): Promise<T>;
  getById(id: number | string): Promise<T | any>;
  getAll(): Promise<T[]>;
  updateById(id: string | number, model: any): Promise<T>;
  deleteById(id: number | string): Promise<any>;
}
