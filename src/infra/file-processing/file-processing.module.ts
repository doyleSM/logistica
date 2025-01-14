import { forwardRef, Module } from '@nestjs/common';
import { UploadFileUseCaseFactory } from './factories/upload-file-use-case.factory';
import { AWSFileProcessingProvider } from './providers/aws.provider';
import { SharedModule } from '../shared/shared.module';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RabbitProducerProvider } from './providers/rabbit-producer.provider';
import { FileUploadedProducerUseCaseFactory } from './factories/file-uploeded-producer.factory';
import { GetFileStreamUseCaseFactory } from './factories/get-file-stream.factory';
import { ProcessFileStreamUseCaseFactory } from './factories/process-stream-file.factory';
import { OrderModule } from '../orders/order.module';
import { FileProcessingController } from './file-processing.controller';
import { FILES_PROCESSING_CONSTANTS } from './constants';
@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        imports: [ConfigModule],
        name: FILES_PROCESSING_CONSTANTS.RABBIT_PRODUCER,
        useFactory: async (configService: ConfigService) => ({
          transport: Transport.RMQ,
          options: {
            urls: [
              `amqp://${configService.get('RABBITMQ_USER')}:${configService.get('RABBITMQ_PASS')}@${configService.get('RABBITMQ_HOST')}:${configService.get('RABBITMQ_PORT')}`,
            ],
            queue: configService.get('RABBIT_FILES_QUEUE_NAME'),
          },
        }),
        inject: [ConfigService],
      },
    ]),
    forwardRef(() => SharedModule),
    forwardRef(() => OrderModule),
  ],
  controllers: [FileProcessingController],
  providers: [
    UploadFileUseCaseFactory,
    AWSFileProcessingProvider,
    RabbitProducerProvider,
    FileUploadedProducerUseCaseFactory,
    GetFileStreamUseCaseFactory,
    ProcessFileStreamUseCaseFactory,
  ],
  exports: [UploadFileUseCaseFactory],
})
export class FilesProcessingModule {}
