export interface CustomerOrderView {
  user_id: number;
  name: string;
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
