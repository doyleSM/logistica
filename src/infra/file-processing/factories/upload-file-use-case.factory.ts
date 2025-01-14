import { Provider } from '@nestjs/common';
import { FILES_PROCESSING_CONSTANTS } from '../constants';
import { UploadFileUseCase } from 'src/application/file-processing/use-cases/upload-file.use-case';
import { AWSFileProcessingProvider } from '../providers/aws.provider';
import { ConfigService } from 'src/infra/shared/services/config.service';
import { ConfService } from 'src/domain/shared/interfaces/config-service.interface';
import { FileRepository } from 'src/domain/file-processing/interfaces/file-repository.interface';

const useFactory = (fileRepository: FileRepository, configService: ConfService) =>
  new UploadFileUseCase(fileRepository, configService);

export const UploadFileUseCaseFactory: Provider = {
  provide: FILES_PROCESSING_CONSTANTS.UPLOAD_FILE_USE_CASE,
  useFactory,
  inject: [AWSFileProcessingProvider, ConfigService],
};
