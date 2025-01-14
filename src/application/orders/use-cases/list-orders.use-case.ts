/* eslint-disable prettier/prettier */
import BaseUseCase from 'src/application/shared/base.use-case';
import { CustomerOrderFilters } from 'src/domain/orders/interfaces/customer-filters';
import { CustomerOrderViewRepository } from 'src/domain/orders/interfaces/customer-order-view-repository.interface';
import { CustomerOrderView } from 'src/domain/orders/interfaces/customer-view';
import { PaginationOptions } from 'src/domain/shared/interfaces/pagination-options';

export class ListOrdersUseCase
  implements BaseUseCase<{ filters: CustomerOrderFilters; pagination?: PaginationOptions }, CustomerOrderView[]> {
  constructor(private readonly customerOrderViewRepository: CustomerOrderViewRepository) {}

  async execute({
    filters,
    pagination,
  }: {
    filters: CustomerOrderFilters;
    pagination?: PaginationOptions;
  }): Promise<CustomerOrderView[]> {
    return this.customerOrderViewRepository.findOrders(filters, pagination);
  }
}
