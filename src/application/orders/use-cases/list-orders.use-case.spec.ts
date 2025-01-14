import { mock, MockProxy } from 'jest-mock-extended';

import { ListOrdersUseCase } from './list-orders.use-case';
import { CustomerOrderViewRepository } from 'src/domain/orders/interfaces/customer-order-view-repository.interface';

const validCustomerOrderView = {
  user_id: 1,
  name: 'John Doe',

  orders: [
    {
      order_id: 1,
      total: (50.21).toFixed(2),
      date: '2021-01-01',
      products: [
        {
          product_id: 1,
          value: (50.21).toFixed(2),
        },
      ],
    },
  ],
};

describe('ListOrdersUseCase', () => {
  let listOrdersUseCase: ListOrdersUseCase;
  let customerOrderViewRepository: MockProxy<CustomerOrderViewRepository>;

  beforeEach(() => {
    customerOrderViewRepository = mock();
    listOrdersUseCase = new ListOrdersUseCase(customerOrderViewRepository);
  });

  it('should list', async () => {
    customerOrderViewRepository.findOrders.mockResolvedValue([validCustomerOrderView]);
    const res = await listOrdersUseCase.execute({ filters: { user_id: 1 }, pagination: { limit: 1, page: 1 } });
    expect(customerOrderViewRepository.findOrders).toHaveBeenCalledWith({ user_id: 1 }, { limit: 1, page: 1 });
    expect(customerOrderViewRepository.findOrders).toHaveBeenCalledTimes(1);
    expect(res.length).toBe(1);
    expect(res).toEqual([validCustomerOrderView]);
  });
  it('should throw if repository throws', async () => {
    customerOrderViewRepository.findOrders.mockRejectedValue(new Error('Fail to list orders'));
    await expect(listOrdersUseCase.execute({ filters: { user_id: 1 }, pagination: { limit: 1, page: 1 } })).rejects.toThrow('Fail to list orders');
  });
});
