import { Inject, Injectable } from '@nestjs/common';
import { CustomerOrderFilters } from 'src/domain/orders/interfaces/customer-filters';
import { CustomerOrderViewRepository } from 'src/domain/orders/interfaces/customer-order-view-repository.interface';
import { CustomerOrderView } from 'src/domain/orders/interfaces/customer-view';
import { PaginationOptions } from 'src/domain/shared/interfaces/pagination-options';
import { CustomerOrderViewEntity } from 'src/infra/database/entities/customer-order-view.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class CustomerOrderViewTypeormPgRepository implements CustomerOrderViewRepository {
  private repository: Repository<CustomerOrderViewEntity>;

  constructor(@Inject('DATA_SOURCE') private dataSource: DataSource) {
    this.repository = this.dataSource.getRepository(CustomerOrderViewEntity);
  }

  async findOrders(filters: CustomerOrderFilters, pagination: PaginationOptions): Promise<CustomerOrderView[]> {
    const query = this.repository.createQueryBuilder('cov');

    if (filters.date) {
      query.andWhere(
        "EXISTS (SELECT 1 FROM jsonb_array_elements(cov.orders) AS order_elem WHERE order_elem->>'date' = :date)",
        { date: filters.date },
      );
    }

    if (filters.user_id) {
      query.andWhere('cov.user_id = :user_id', { user_id: filters.user_id });
    }

    if (filters.name) {
      query.andWhere('cov.name ILIKE :name', { name: `%${filters.name}%` });
    }

    query.skip((pagination.page - 1) * pagination.limit);
    query.take(pagination.limit);

    return await query.getMany();
  }
}
