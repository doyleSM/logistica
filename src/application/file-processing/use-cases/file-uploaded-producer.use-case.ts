import BaseUseCase from 'src/application/shared/base.use-case';
import { EventProducer } from 'src/domain/file-processing/interfaces/event-producer.interface';
import { UploadEvent } from 'src/domain/file-processing/types/upload-event.type';

import { ConfService } from 'src/domain/shared/interfaces/config-service.interface';

export class FileUploadedProducerUseCase implements BaseUseCase<UploadEvent, void> {
  queue: string = '';
  constructor(
    private readonly eventProducer: EventProducer<UploadEvent>,
    private readonly configService: ConfService,
  ) {
    this.queue = this.configService.get('RABBIT_FILES_QUEUE_NAME');
  }

  async execute(input: UploadEvent): Promise<void> {
    await this.eventProducer.publish(input, this.queue);
  }
}
