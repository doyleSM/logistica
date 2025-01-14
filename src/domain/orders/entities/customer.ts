import { DomainException } from 'src/domain/shared/exceptions/domain.exception';
import Validator from 'src/domain/shared/validator/validator';

type CustomerProps = {
  name: string;
  id: number;
};

export class Customer {
  readonly name: string;
  readonly id: number;

  constructor(props: CustomerProps) {
    this.name = props.name;
    this.id = props.id;

    const errors = Validator.combine(
      Validator.notEmpty(this.name, 'Name is required'),
      Validator.lessThan(this.name, 45, 'Name length must have maximum 45 characters'),
      Validator.notNull(this.id, 'Customer ID is required'),
      Validator.lessThan(this.id, 11, 'Customer ID must have maximum 10 characters'),
    );
    if (errors) {
      throw new DomainException(errors.join('\n'));
    }
  }
}
