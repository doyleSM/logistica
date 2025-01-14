import { PrimaryColumn, Column, Entity } from 'typeorm';

@Entity('customer_order_view')
export class CustomerOrderViewEntity {
  @PrimaryColumn()
  user_id: number;

  @Column()
  name: string;

  @Column('json')
  orders: Array<{
    order_id: number;
    date: string;
    total: string;
    products: Array<{
      product_id: number;
      value: string;
    }>;
  }>;
}
