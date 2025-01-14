import { ApiProperty } from '@nestjs/swagger';

export class ProductDto {
  @ApiProperty({ description: 'ID of the product' })
  product_id: number;

  @ApiProperty({ description: 'Value of the product' })
  value: string;
}

export class OrderDto {
  @ApiProperty({ description: 'ID of the order' })
  order_id: number;

  @ApiProperty({ description: 'Date of the order' })
  date: string;

  @ApiProperty({ description: 'Total value of the order' })
  total: string;

  @ApiProperty({ description: 'List of products in the order' })
  products: ProductDto[];
}

export class CustomerOrderViewDto {
  @ApiProperty({ description: 'ID of the customer' })
  user_id: number;

  @ApiProperty({ description: 'Name of the customer' })
  name: string;

  @ApiProperty({ description: 'List of orders made by the customer' })
  orders: OrderDto[];
}
