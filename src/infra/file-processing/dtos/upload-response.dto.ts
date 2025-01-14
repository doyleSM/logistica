import { ApiProperty } from '@nestjs/swagger';

export class UploadFileResponseDto {
  @ApiProperty({ description: 'Bucket where the file is stored' })
  bucket: string;

  @ApiProperty({ description: 'Name of the uploaded file' })
  fileName: string;

  @ApiProperty({ description: 'URL of the uploaded file' })
  fileUrl: string;
}
