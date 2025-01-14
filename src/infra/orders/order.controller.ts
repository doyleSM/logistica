import { Controller, Get, Inject, Query } from '@nestjs/common';
import { ListOrdersUseCase } from 'src/application/orders/use-cases/list-orders.use-case';
import { ORDER_CONSTANTS } from './constants';
import { PaginationOptions } from 'src/domain/shared/interfaces/pagination-options';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CustomerOrderFiltersDto } from './dtos/customer-order-filter.dto';
import { CustomerOrderViewDto } from './dtos/customer-order-response.dto';
import { PaginationOptionsDto } from './dtos/pagination-options';

@ApiTags('Customer Orders')
@Controller('orders')
export class CustomerOrderController {
  constructor(@Inject(ORDER_CONSTANTS.LIST_ORDERS_USE_CASE) private readonly listOrdersUseCase: ListOrdersUseCase) {}

  @Get()
  @ApiOperation({ summary: 'Get a list of orders based on filters' })
  @ApiQuery({ name: 'page', type: Number, required: false, description: 'Page number for pagination' })
  @ApiQuery({ name: 'limit', type: Number, required: false, description: 'Number of items per page' })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved the orders',
    type: [CustomerOrderViewDto],
  })
  async getOrders(@Query() filters: CustomerOrderFiltersDto, @Query() paginationOptions: PaginationOptionsDto) {
    const pagination: PaginationOptions = {
      page: paginationOptions.page || 1,
      limit: paginationOptions.limit || 10,
    };

    return this.listOrdersUseCase.execute({ filters, pagination });
  }
}
