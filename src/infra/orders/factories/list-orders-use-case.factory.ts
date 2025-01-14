import { Provider } from '@nestjs/common';
import { ORDER_CONSTANTS } from '../constants';

import { CustomerOrderViewRepository } from 'src/domain/orders/interfaces/customer-order-view-repository.interface';
import {} from 'src/domain/orders/interfaces/order-repository.interface';
import { ListOrdersUseCase } from 'src/application/orders/use-cases/list-orders.use-case';
import { CustomerOrderViewTypeormPgRepository } from '../providers/customer-order-typeorm-pg.repo.provider';

const useFactory = (customerOrderViewRepository: CustomerOrderViewRepository) => new ListOrdersUseCase(customerOrderViewRepository);

export const listOrdersUseCaseCaseFactory: Provider = {
  provide: ORDER_CONSTANTS.LIST_ORDERS_USE_CASE,
  useFactory,
  inject: [CustomerOrderViewTypeormPgRepository],
};
