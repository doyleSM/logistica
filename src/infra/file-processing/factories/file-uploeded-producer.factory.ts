import { Provider } from '@nestjs/common';
import { FILES_PROCESSING_CONSTANTS } from '../constants';
import { ConfigService } from 'src/infra/shared/services/config.service';
import { ConfService } from 'src/domain/shared/interfaces/config-service.interface';
import { EventProducer } from 'src/domain/file-processing/interfaces/event-producer.interface';
import { FileUploadedProducerUseCase } from 'src/application/file-processing/use-cases/file-uploaded-producer.use-case';
import { RabbitProducerProvider } from '../providers/rabbit-producer.provider';
import { UploadEvent } from 'src/domain/file-processing/types/upload-event.type';

const useFactory = (eventProducer: EventProducer<UploadEvent>, configService: ConfService) =>
  new FileUploadedProducerUseCase(eventProducer, configService);

export const FileUploadedProducerUseCaseFactory: Provider = {
  provide: FILES_PROCESSING_CONSTANTS.FILE_UPLOADED_PRODUCER,
  useFactory,
  inject: [RabbitProducerProvider, ConfigService],
};
