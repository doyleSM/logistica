import { Provider } from '@nestjs/common';
import { FILES_PROCESSING_CONSTANTS } from '../constants';

import { GetFileStreamUseCase } from 'src/application/file-processing/use-cases/get-file-stream.use-case';
import { FileRepository } from 'src/domain/file-processing/interfaces/file-repository.interface';
import { AWSFileProcessingProvider } from '../providers/aws.provider';

const useFactory = (fileRepository: FileRepository) => new GetFileStreamUseCase(fileRepository);

export const GetFileStreamUseCaseFactory: Provider = {
  provide: FILES_PROCESSING_CONSTANTS.GET_FILE_STREAM,
  useFactory,
  inject: [AWSFileProcessingProvider],
};
