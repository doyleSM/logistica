import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { OrderEntity } from './order.entity';

@Entity('order_item')
@Index('IDX_ORDER_ITEM_ORDER_ID', ['order_id'])
@Index('IDX_ORDER_ITEM_PRODUCT_ID', ['product_id'])
export class OrderItemEntity {
  @PrimaryGeneratedColumn('increment', { type: 'int' })
  id: number;

  @Column({ type: 'int', nullable: false, generated: false })
  order_id: number;

  @Column({ type: 'int', nullable: false, generated: false })
  product_id: number;

  @Column({ type: 'decimal', precision: 12, scale: 2, nullable: false })
  value: number;

  @ManyToOne(() => OrderEntity, (order) => order.orderItems)
  @JoinColumn({ name: 'order_id' })
  order: OrderEntity;
}
