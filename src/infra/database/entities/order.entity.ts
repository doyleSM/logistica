import { Column, Entity, Index, JoinColumn, ManyToOne, OneToMany, PrimaryColumn } from 'typeorm';
import { CustomerEntity } from './customer.entity';
import { OrderItemEntity } from './order-item.entity';

@Entity('order')
@Index('IDX_ORDER_CLIENT', ['client_id'])
@Index('IDX_ORDER_DATE', ['date'])
export class OrderEntity {
  @PrimaryColumn({ type: 'int', nullable: false, generated: false })
  id: number;

  @Column({ type: 'date', nullable: false, generated: false })
  date: Date;

  @Column({ type: 'int', nullable: false, generated: false })
  client_id: number;

  @ManyToOne(() => CustomerEntity, (customer) => customer.orders)
  @JoinColumn({ name: 'client_id' })
  client: CustomerEntity;

  @OneToMany(() => OrderItemEntity, (orderItem) => orderItem.order)
  orderItems: OrderItemEntity[];
}
