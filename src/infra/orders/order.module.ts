import { forwardRef, Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { OrderTypeormPgRepoProvider } from './providers/order-typeorm-pg-repo.provider';
import { createOrderBatchUseCaseFactory } from './factories/create-order-batch-use-case.factory';
import { CustomerOrderViewTypeormPgRepository } from './providers/customer-order-typeorm-pg.repo.provider';
import { listOrdersUseCaseCaseFactory } from './factories/list-orders-use-case.factory';
import { CustomerOrderController } from './order.controller';

@Module({
  controllers: [CustomerOrderController],
  imports: [forwardRef(() => DatabaseModule)],
  providers: [
    OrderTypeormPgRepoProvider,
    createOrderBatchUseCaseFactory,
    CustomerOrderViewTypeormPgRepository,
    listOrdersUseCaseCaseFactory,
  ],
  exports: [createOrderBatchUseCaseFactory],
})
export class OrderModule {}
