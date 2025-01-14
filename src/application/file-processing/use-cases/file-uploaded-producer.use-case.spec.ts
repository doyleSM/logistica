import { mock, MockProxy } from 'jest-mock-extended';
import { FileUploadedProducerUseCase } from './file-uploaded-producer.use-case';
import { EventProducer } from 'src/domain/file-processing/interfaces/event-producer.interface';
import { UploadEvent } from 'src/domain/file-processing/types/upload-event.type';
import { ConfService } from 'src/domain/shared/interfaces/config-service.interface';

describe('FileUploadedProducerUseCase', () => {
  let useCase: FileUploadedProducerUseCase;
  let eventProducer: MockProxy<EventProducer<UploadEvent>>;
  let configService: MockProxy<ConfService>;

  beforeEach(() => {
    eventProducer = mock<EventProducer<UploadEvent>>();
    configService = mock<ConfService>();
    configService.get.mockReturnValue('mock-queue-name');

    useCase = new FileUploadedProducerUseCase(eventProducer, configService);
  });

  it('should publish an upload event to the correct queue', async () => {
    const input: UploadEvent = { bucket: 'test-bucket', fileName: 'test-file.txt', fileUrl: 'http://test.com' };

    await useCase.execute(input);

    expect(eventProducer.publish).toHaveBeenCalledWith(input, 'mock-queue-name');
    expect(eventProducer.publish).toHaveBeenCalledTimes(1);
  });

  it('should initialize the queue name from config service', () => {
    expect(useCase.queue).toBe('mock-queue-name');
    expect(configService.get).toHaveBeenCalledWith('RABBIT_FILES_QUEUE_NAME');
  });
  it('should throw an error if the event producer fails to publish the event', async () => {
    const input: UploadEvent = { bucket: 'test-bucket', fileName: 'test-file.txt', fileUrl: 'http://test.com' };

    eventProducer.publish.mockRejectedValueOnce(new Error('Failed to publish event'));

    await expect(useCase.execute(input)).rejects.toThrow('Failed to publish event');
  });
});
