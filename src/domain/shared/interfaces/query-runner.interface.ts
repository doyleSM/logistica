import { IEntityManager } from './entity-manager';

export interface IQueryRunner {
  connect(): Promise<void>;
  startTransaction(): Promise<void>;
  commitTransaction(): Promise<void>;
  rollbackTransaction(): Promise<void>;
  release(): Promise<void>;
  getManager(): IEntityManager;
}
