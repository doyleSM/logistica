import { Inject, Injectable } from '@nestjs/common';
import { Order } from 'src/domain/orders/entities/order';
import { OrderRepository } from 'src/domain/orders/interfaces/order-repository.interface';
import { CustomerEntity } from 'src/infra/database/entities/customer.entity';
import { OrderItemEntity } from 'src/infra/database/entities/order-item.entity';
import { OrderEntity } from 'src/infra/database/entities/order.entity';
import { DataSource } from 'typeorm';

@Injectable()
export class OrderTypeormPgRepoProvider implements OrderRepository {
  private customers: CustomerEntity[] = [];
  private orderItems: OrderItemEntity[] = [];
  private orders: OrderEntity[] = [];

  constructor(@Inject('DATA_SOURCE') private dataSource: DataSource) {}

  async createBatch(orders: Order[]): Promise<void> {
    this.ensureLocalVarEmpty();
    this.mapModelsToEntity(orders);

    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      await queryRunner.manager
        .createQueryBuilder()
        .insert()
        .into(CustomerEntity)
        .values(this.customers)
        .orIgnore()
        .execute();

      await queryRunner.manager
        .createQueryBuilder()
        .insert()
        .into(OrderEntity)
        .values(this.orders)
        .orIgnore()
        .execute();

      await queryRunner.manager.createQueryBuilder().insert().into(OrderItemEntity).values(this.orderItems).execute(); //nesse nao ignora duplicação

      await queryRunner.commitTransaction();
    } catch (err) {
      console.log(err);
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }

  private ensureLocalVarEmpty(): void {
    this.customers = [];
    this.orderItems = [];
    this.orders = [];
  }

  private mapModelsToEntity(orders: Order[]): void {
    orders.forEach((order) => {
      const customer = new CustomerEntity();
      customer.name = order.customer.name;
      customer.id = order.customer.id;
      this.customers.push(customer);

      order.items.map((item) => {
        const orderItem = new OrderItemEntity();
        orderItem.product_id = item.product_id;
        orderItem.order_id = item.order_id;
        orderItem.value = item.value;
        this.orderItems.push(orderItem);
      });
      const orderEntity = new OrderEntity();
      orderEntity.date = new Date(order.dateFormated);
      orderEntity.id = order.id;
      orderEntity.client_id = order.customer.id;
      this.orders.push(orderEntity);
    });
  }
}
