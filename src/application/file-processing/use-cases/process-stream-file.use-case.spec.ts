import { mock, MockProxy } from 'jest-mock-extended';
import { ProcessFileStreamUseCase } from './process-stream-file.use-case';
import { CreateOrderBatchUseCase } from 'src/application/orders/use-cases/create-order-batch.use-case';
import { IStreamableFile } from 'src/domain/file-processing/interfaces/file-repository.interface';
import { Readable } from 'stream';
import { Order } from 'src/domain/orders/entities/order';

describe('UploadFileUseCase', () => {
  let useCase: ProcessFileStreamUseCase;
  let createOrderBatchUseCase: MockProxy<CreateOrderBatchUseCase>;

  beforeEach(() => {
    createOrderBatchUseCase = mock();
    useCase = new ProcessFileStreamUseCase(createOrderBatchUseCase, 2);
  });

  it('should process a file stream and create order batches', async () => {
    const mockLines = [
      '0000000070                              Palmer Prosacco00000007530000000003     1836.7420210308',
      '0000000075                                  Bobbie Batz00000007980000000002     1578.5720211116',
      '0000000075                                  Bobbie Batz00000007980000000002     1578.5720211116',
    ];

    const mockStream = createMockStream(mockLines);
    const mockPayload: IStreamableFile = {
      getStream: jest.fn().mockReturnValue(mockStream),
    } as unknown as IStreamableFile;

    await useCase.execute(mockPayload);

    expect(createOrderBatchUseCase.execute).toHaveBeenCalledTimes(2);
    expect(createOrderBatchUseCase.execute).toHaveBeenCalledWith(expect.any(Array));

    const calledOrders = createOrderBatchUseCase.execute.mock.calls[0][0] as Order[];

    expect(calledOrders.length).toBe(2);
    expect(calledOrders[0].id).toBe(753);
    expect(calledOrders[1].id).toBe(798);
  });

  it('should throw an error if the file processing fails', async () => {
    const mockStream = createMockStream(['0000000070                              Palmer Prosacco00000007530000000003     1836.7420210308']);
    const mockPayload: IStreamableFile = {
      getStream: jest.fn().mockReturnValue(mockStream),
    } as unknown as IStreamableFile;

    createOrderBatchUseCase.execute.mockRejectedValueOnce(new Error('Failed to process file'));

    await expect(useCase.execute(mockPayload)).rejects.toThrow('Failed to process file');
  });

  function createMockStream(lines: string[]): NodeJS.ReadableStream {
    const stream = new Readable({
      read() {
        lines.forEach((line) => this.push(`${line}\n`));
        this.push(null); // End of stream
      },
    });
    return stream;
  }
});
