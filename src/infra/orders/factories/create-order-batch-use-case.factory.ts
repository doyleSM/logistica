import { Provider } from '@nestjs/common';
import { ORDER_CONSTANTS } from '../constants';

import { CreateOrderBatchUseCase } from 'src/application/orders/use-cases/create-order-batch.use-case';
import { OrderRepository } from 'src/domain/orders/interfaces/order-repository.interface';
import { OrderTypeormPgRepoProvider } from '../providers/order-typeorm-pg-repo.provider';

const useFactory = (orderRepository: OrderRepository) => new CreateOrderBatchUseCase(orderRepository);

export const createOrderBatchUseCaseFactory: Provider = {
  provide: ORDER_CONSTANTS.CREATE_ORDER_BATCH_USE_CASE,
  useFactory,
  inject: [OrderTypeormPgRepoProvider],
};
