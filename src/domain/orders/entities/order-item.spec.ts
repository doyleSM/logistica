import { OrderItem } from './order-item';

describe('OrderItem', () => {
  describe('id', () => {
    it('should be defined', () => {
      const orderItem = new OrderItem({ order_id: 1, product_id: 1, value: 1 });
      expect(orderItem.order_id).toBeDefined();
    });
    it('should throw if id null', () => {
      expect(() => new OrderItem({ order_id: null, product_id: 1, value: 1 })).toThrow();
    });
    it('should throw if undefined', () => {
      expect(() => new OrderItem({ order_id: undefined, product_id: 1, value: 1 })).toThrow();
    });
    it('should throw if id is greather than 10 chars', () => {
      expect(() => new OrderItem({ order_id: 12345678910, product_id: 1, value: 1 })).toThrow();
    });
  });
  describe('product_id', () => {
    it('should be defined', () => {
      const orderItem = new OrderItem({ order_id: 1, product_id: 1, value: 1 });
      expect(orderItem.product_id).toBeDefined();
    });
    it('should throw if product_id null', () => {
      expect(() => new OrderItem({ order_id: 1, product_id: null, value: 1 })).toThrow();
    });
    it('should throw if undefined', () => {
      expect(() => new OrderItem({ order_id: 1, product_id: undefined, value: 1 })).toThrow();
    });
    it('should throw if product_id is greather than 10 chars', () => {
      expect(() => new OrderItem({ order_id: 1, product_id: 12345678910, value: 1 })).toThrow();
    });
  });
  describe('value', () => {
    it('should be defined', () => {
      const orderItem = new OrderItem({ order_id: 1, product_id: 1, value: 1 });
      expect(orderItem.value).toBeDefined();
    });
    it('should throw if value null', () => {
      expect(() => new OrderItem({ order_id: 1, product_id: 1, value: null })).toThrow();
    });
    it('should throw if value undefined', () => {
      expect(() => new OrderItem({ order_id: 1, product_id: 1, value: undefined })).toThrow();
    });
    it('should throw if value is less than 0', () => {
      expect(() => new OrderItem({ order_id: 1, product_id: 123, value: -1 })).toThrow();
    });
  });
});
