import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsInt } from 'class-validator';

export class CustomerOrderFiltersDto {
  @ApiPropertyOptional({
    description: 'Filter orders by date',
    type: String,
    example: '2025-01-13',
  })
  @IsOptional()
  @IsString()
  date?: string;

  @ApiPropertyOptional({
    description: 'Filter orders by user ID',
    type: Number,
    example: 1,
  })
  @IsOptional()
  @IsInt()
  user_id?: number;

  @ApiPropertyOptional({
    description: 'Filter orders by customer name',
    type: String,
    example: 'John Doe',
  })
  @IsOptional()
  @IsString()
  name?: string;
}
