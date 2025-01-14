import { Customer } from './customer';

describe('Customer', () => {
  describe('name', () => {
    it('should throw an error if name is empty', () => {
      expect(() => new Customer({ name: '', id: 1234567890 })).toThrow('Name is required');
    });

    it('should throw an error if name length is greater than 45 characters', () => {
      expect(
        () =>
          new Customer({
            name: 'a'.repeat(46),
            id: 1234567890,
          }),
      ).toThrow('Name length must have maximum 45 characters');
    });
  });

  describe('customer_id', () => {
    it('should throw an error if customer_id is empty', () => {
      expect(() => new Customer({ name: 'John Doe', id: null as any })).toThrow('Customer ID is required');
      expect(() => new Customer({ name: 'John Doe', id: undefined })).toThrow('Customer ID is required');
    });

    it('should throw an error if customer_id length is greather than 10 characters', () => {
      expect(
        () =>
          new Customer({
            name: 'a'.repeat(10),
            id: 123456789132,
          }),
      ).toThrow('Customer ID must have maximum 10 characters');
    });
  });

  describe('valid customer', () => {
    it('should create a customer with valid data', () => {
      const customer = new Customer({
        name: 'a'.repeat(12),
        id: 1,
      });

      expect(customer).toBeInstanceOf(Customer);
    });
  });
});
