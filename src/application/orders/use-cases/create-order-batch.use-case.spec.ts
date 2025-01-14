import { CreateOrderBatchUseCase } from './create-order-batch.use-case';
import { mock, MockProxy } from 'jest-mock-extended';
import { Customer } from 'src/domain/orders/entities/customer';
import { Order } from 'src/domain/orders/entities/order';
import { OrderItem } from 'src/domain/orders/entities/order-item';
import { OrderRepository } from 'src/domain/orders/interfaces/order-repository.interface';

describe('CreateOrderBatchUseCase', () => {
  let createOrderBatchUseCase: CreateOrderBatchUseCase;
  let orderRepository: MockProxy<OrderRepository>;

  beforeEach(() => {
    orderRepository = mock();
    createOrderBatchUseCase = new CreateOrderBatchUseCase(orderRepository);
  });

  it('should create a batch of orders', async () => {
    const order = new Order({
      id: 1,
      date: '20210101',
      customer: new Customer({
        id: 1,
        name: 'John Doe',
      }),
      items: [new OrderItem({ order_id: 1, product_id: 1, value: 1 })],
    });
    await createOrderBatchUseCase.execute([order]);
    expect(orderRepository.createBatch).toHaveBeenCalledWith([order]);
    expect(orderRepository.createBatch).toHaveBeenCalledTimes(1);
  });
  it('should throw if repository throws', async () => {
    const order = new Order({
      id: 1,
      date: '20210101',
      customer: new Customer({
        id: 1,
        name: 'John Doe',
      }),
      items: [new OrderItem({ order_id: 1, product_id: 1, value: 1 })],
    });
    orderRepository.createBatch.mockRejectedValue(new Error('Fail to create batch'));
    await expect(createOrderBatchUseCase.execute([order])).rejects.toThrow('Fail to create batch');
  });
});
