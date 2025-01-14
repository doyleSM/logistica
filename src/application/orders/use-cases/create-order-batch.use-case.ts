import BaseUseCase from 'src/application/shared/base.use-case';
import { Order } from 'src/domain/orders/entities/order';
import { OrderRepository } from 'src/domain/orders/interfaces/order-repository.interface';

export class CreateOrderBatchUseCase implements BaseUseCase<Order[], void> {
  constructor(private readonly orderRepository: OrderRepository) {}

  async execute(orders: Order[]): Promise<void> {
    await this.orderRepository.createBatch(orders);
  }
}
