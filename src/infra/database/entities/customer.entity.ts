import { Entity, PrimaryColumn, Column, OneToMany, Index } from 'typeorm';
import { OrderEntity } from './order.entity';

@Entity('customer')
@Index('IDX_CUSTOMER_NAME', ['name'])
export class CustomerEntity {
  @PrimaryColumn({ type: 'int', nullable: false, generated: false })
  id: number;

  @Column({ type: 'varchar', length: 45, nullable: false })
  name: string;

  @OneToMany(() => OrderEntity, (order) => order.client)
  orders: OrderEntity[];
}
