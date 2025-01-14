import BaseUseCase from 'src/application/shared/base.use-case';
import { UploadFileInputDto } from '../dto/upload-file.input.dto';
import { UploadFileOutputDto } from '../dto/upload-file.output.dto ';
import { ConfService } from 'src/domain/shared/interfaces/config-service.interface';
import { FileRepository } from 'src/domain/file-processing/interfaces/file-repository.interface';

export class UploadFileUseCase implements BaseUseCase<UploadFileInputDto, UploadFileOutputDto> {
  constructor(
    private readonly fileRepository: FileRepository,
    private readonly configService: ConfService,
  ) {}

  async execute(input: UploadFileInputDto): Promise<UploadFileOutputDto> {
    const { buffer, mimetype, name, originalname } = input;
    const bucketName: string = this.configService.get('S3_FILES_BUCKET_NAME');
    const res = await this.fileRepository.uploadFile(
      {
        buffer,
        mimetype,
        name,
        originalname,
      },
      bucketName,
    );
    return { fileUrl: res.url, fileName: originalname, bucket: bucketName };
  }
}
