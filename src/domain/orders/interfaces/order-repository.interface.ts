import { Order } from '../entities/order';

export interface OrderRepository {
  createBatch(orders: Order[]): Promise<void>;
}
