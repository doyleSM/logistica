import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsInt } from 'class-validator';

export class PaginationOptionsDto {
  @ApiPropertyOptional({
    description: 'Page number for pagination',
    example: 1,
  })
  @IsOptional()
  @IsInt()
  page?: number;

  @ApiPropertyOptional({
    description: 'Number of items per page',
    example: 10,
  })
  @IsOptional()
  @IsInt()
  limit?: number;
}
