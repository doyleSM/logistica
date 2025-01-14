import { DomainException } from 'src/domain/shared/exceptions/domain.exception';
import Validator from 'src/domain/shared/validator/validator';

type OrderItemProps = {
  order_id: number;
  value: number;
  product_id: number;
};

export class OrderItem {
  readonly order_id: number;
  readonly value: number;
  readonly product_id: number;

  constructor(props: OrderItemProps) {
    this.order_id = props.order_id;
    this.value = props.value;
    this.product_id = props.product_id;

    const errors = Validator.combine(
      Validator.notNull(this.order_id, 'id is required'),
      Validator.lessThan(this.order_id, 11, 'ID must have maximum 10 characters'),
      Validator.notNull(this.value, 'value is required'),
      Validator.notNull(this.product_id, 'product_id is required'),
      Validator.lessThan(this.product_id, 11, 'product_id must have maximum 10 characters'),
      Validator.notNull(this.value, 'value is required'),
      Validator.minVal(this.value, 0, 'value must be greater than 0'),
    );
    if (errors) {
      throw new DomainException(errors.join('\n'));
    }
  }
}
