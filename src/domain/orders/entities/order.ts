import { DomainException } from 'src/domain/shared/exceptions/domain.exception';
import Validator from 'src/domain/shared/validator/validator';
import { Customer } from './customer';
import { OrderItem } from './order-item';

type OrderItemProps = {
  id: number;
  date: string;
  customer: Customer;
  items: OrderItem[];
};

export class Order {
  readonly id: number;
  readonly date: string;
  readonly customer: Customer;
  readonly items: OrderItem[];

  constructor(props: OrderItemProps) {
    this.id = props.id;
    this.date = props.date;
    this.customer = props.customer;
    this.items = props.items;

    const errors = Validator.combine(
      Validator.notNull(this.id, 'Id is required'),
      Validator.lessThan(this.id, 11, 'Id must have maximum 10 characters'),
      Validator.notNull(this.date, 'Date is required'),
      Validator.validStringDate(this.date, 'Date must be in the format YYYYMMDD'),
      Validator.notNull(this.customer, 'Customer is required'),
      Validator.notNull(this.items, 'Items is required'),
    );
    if (errors) {
      throw new DomainException(errors.join('\n'));
    }
  }

  get dateFormated(): string {
    return `${this.date.substring(0, 4)}-${this.date.substring(4, 6)}-${this.date.substring(6, 8)}`;
  }
}
