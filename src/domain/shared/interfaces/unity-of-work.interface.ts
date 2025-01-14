import { IEntityManager } from './entity-manager';

export interface IUnitOfWork {
  start(): Promise<void>;
  getManager(): IEntityManager;
  commit(): Promise<void>;
  rollback(): Promise<void>;
}
