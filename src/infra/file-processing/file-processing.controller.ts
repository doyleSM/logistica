import { Controller, Post, Inject, UseInterceptors, UploadedFile } from '@nestjs/common';
import { ApiBody, ApiConsumes, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UploadFileUseCase } from 'src/application/file-processing/use-cases/upload-file.use-case';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileUploadedProducerUseCase } from 'src/application/file-processing/use-cases/file-uploaded-producer.use-case';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { GetFileStreamUseCase } from 'src/application/file-processing/use-cases/get-file-stream.use-case';
import { UploadEvent } from 'src/domain/file-processing/types/upload-event.type';
import { ProcessFileStreamUseCase } from 'src/application/file-processing/use-cases/process-stream-file.use-case';
import { FILES_PROCESSING_CONSTANTS } from './constants';
import { UploadFileResponseDto } from './dtos/upload-response.dto';

@ApiTags('File Processing')
@Controller('files')
export class FileProcessingController {
  constructor(
    @Inject(FILES_PROCESSING_CONSTANTS.UPLOAD_FILE_USE_CASE)
    private readonly uploadFileUseCase: UploadFileUseCase,
    @Inject(FILES_PROCESSING_CONSTANTS.FILE_UPLOADED_PRODUCER)
    private readonly fileUploadedProducerUseCase: FileUploadedProducerUseCase,
    @Inject(FILES_PROCESSING_CONSTANTS.GET_FILE_STREAM)
    private readonly getFileStreamUseCase: GetFileStreamUseCase,
    @Inject(FILES_PROCESSING_CONSTANTS.PROCESS_STREAM_FILE)
    private readonly processFileStreamUseCase: ProcessFileStreamUseCase,
  ) {}

  @Post('import')
  @UseInterceptors(FileInterceptor('file'))
  @ApiOperation({ summary: 'Upload a file to the server' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'The file has been successfully uploaded.',
    type: UploadFileResponseDto,
  })
  async uploadFile(@UploadedFile() file: Express.Multer.File): Promise<UploadFileResponseDto> {
    const extArray = file.mimetype.split('/');
    const extension = extArray[extArray.length - 1];
    const { bucket, fileName, fileUrl } = await this.uploadFileUseCase.execute({
      buffer: file.buffer,
      mimetype: file.mimetype,
      name: file.fieldname,
      originalname: `${file.originalname}.${extension}`,
    });
    this.fileUploadedProducerUseCase.execute({ bucket, fileName, fileUrl });
    return { bucket, fileName, fileUrl };
  }

  @MessagePattern('files')
  async receiveEvent(@Payload() data: UploadEvent) {
    const res = await this.getFileStreamUseCase.execute({ bucket: data.bucket, fileName: data.fileName });
    this.processFileStreamUseCase.execute(res);
  }
}
