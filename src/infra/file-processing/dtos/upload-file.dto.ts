import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class UploadFileDto {
  @ApiProperty({
    description: 'The file to upload',
    type: 'string',
    format: 'binary',
  })
  @IsNotEmpty()
  file: Express.Multer.File;
}
