export interface IEntityManager {
  save<T>(entity: T, data: T[]): Promise<T[]>;
  find<T>(entity: T, options?: any): Promise<T[]>;
}
