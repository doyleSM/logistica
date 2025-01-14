import { IQueryRunner } from './query-runner.interface';

export interface IDataSource {
  createQueryRunner(): IQueryRunner;
}
