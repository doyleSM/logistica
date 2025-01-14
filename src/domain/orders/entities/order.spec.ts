import { Customer } from './customer';
import { Order } from './order';
import { OrderItem } from './order-item';

const validCustomer = new Customer({ id: 1, name: 'John Doe' });
const validOrderItem = new OrderItem({ order_id: 1, product_id: 1, value: 1 });

describe('Order', () => {
  describe('id', () => {
    it('should be defined', () => {
      const order = new Order({ id: 1, date: '20210101', customer: validCustomer, items: [validOrderItem] });
      expect(order.id).toBeDefined();
    });
    it('should throw if id null', () => {
      expect(
        () => new Order({ id: null, date: '20210101', customer: validCustomer, items: [validOrderItem] }),
      ).toThrow();
    });
    it('should throw if undefined', () => {
      expect(
        () => new Order({ id: undefined, date: '20210101', customer: validCustomer, items: [validOrderItem] }),
      ).toThrow();
    });
    it('should throw if id is greather than 10 chars', () => {
      expect(
        () => new Order({ id: 12345678910, date: '20210101', customer: validCustomer, items: [validOrderItem] }),
      ).toThrow();
    });
  });
  describe('date', () => {
    it('should be defined', () => {
      const order = new Order({ id: 1, date: '20210101', customer: validCustomer, items: [validOrderItem] });
      expect(order.date).toBeDefined();
      expect(order.dateFormated).toBe('2021-01-01');
    });
    it('should throw if null', () => {
      expect(() => new Order({ id: 1, date: null, customer: validCustomer, items: [validOrderItem] })).toThrow();
    });
    it('should throw if undefined', () => {
      expect(() => new Order({ id: 1, date: undefined, customer: validCustomer, items: [validOrderItem] })).toThrow();
    });
    it('should throw if date is not in format YYYYMMDD', () => {
      expect(
        () => new Order({ id: 1, date: '2021-01-01', customer: validCustomer, items: [validOrderItem] }),
      ).toThrow();
    });
  });
  describe('customer', () => {
    it('should be defined', () => {
      const order = new Order({ id: 1, date: '20210101', customer: validCustomer, items: [validOrderItem] });
      expect(order.customer).toBeDefined();
    });
    it('should throw if null', () => {
      expect(() => new Order({ id: 1, date: '20210101', customer: null, items: [validOrderItem] })).toThrow();
    });
    it('should throw if undefined', () => {
      expect(() => new Order({ id: 1, date: '20210101', customer: undefined, items: [validOrderItem] })).toThrow();
    });
  });
  describe('items', () => {
    it('should be defined', () => {
      const order = new Order({ id: 1, date: '20210101', customer: validCustomer, items: [validOrderItem] });
      expect(order.items).toBeDefined();
    });
    it('should throw if null', () => {
      expect(() => new Order({ id: 1, date: '20210101', customer: validCustomer, items: null })).toThrow();
    });
    it('should throw if undefined', () => {
      expect(() => new Order({ id: 1, date: '20210101', customer: validCustomer, items: undefined })).toThrow();
    });
  });
});
