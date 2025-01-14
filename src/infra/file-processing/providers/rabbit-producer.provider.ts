import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { EventProducer } from 'src/domain/file-processing/interfaces/event-producer.interface';
import { UploadEvent } from 'src/domain/file-processing/types/upload-event.type';
import { FILES_PROCESSING_CONSTANTS } from '../constants';

@Injectable()
export class RabbitProducerProvider implements EventProducer<UploadEvent> {
  constructor(@Inject(FILES_PROCESSING_CONSTANTS.RABBIT_PRODUCER) private client: ClientProxy) {
    this.client.connect();
  }

  async publish(payload: UploadEvent, queue: string): Promise<void> {
    this.client.emit(queue, payload);
  }
}
