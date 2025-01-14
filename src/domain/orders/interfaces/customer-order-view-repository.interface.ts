import { PaginationOptions } from 'src/domain/shared/interfaces/pagination-options';
import { CustomerOrderFilters } from './customer-filters';
import { CustomerOrderView } from './customer-view';

export interface CustomerOrderViewRepository {
  findOrders(filters: CustomerOrderFilters, pagination: PaginationOptions): Promise<CustomerOrderView[]>;
}
