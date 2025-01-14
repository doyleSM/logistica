import { mock, MockProxy } from 'jest-mock-extended';
import { FileRepository, IStreamableFile } from 'src/domain/file-processing/interfaces/file-repository.interface';
import { GetFileStreamUseCase } from './get-file-stream.use-case';
import { GetFileStreamInputDto } from '../dto/get-file-stream.input.dto';

describe('GetFileStreamUseCase', () => {
  let useCase: GetFileStreamUseCase;
  let fileRepository: MockProxy<FileRepository>;

  beforeEach(() => {
    fileRepository = mock();
    useCase = new GetFileStreamUseCase(fileRepository);
  });

  it('should return a streamable file from the repository', async () => {
    const mockStreamableFile: IStreamableFile = {
      getStream: jest.fn(),
    };
    fileRepository.getFileStream.mockResolvedValue(mockStreamableFile);

    const input: GetFileStreamInputDto = {
      bucket: 'test-bucket',
      fileName: 'test-file.txt',
    };

    const result = await useCase.execute(input);

    expect(fileRepository.getFileStream).toHaveBeenCalledWith('test-bucket', 'test-file.txt');
    expect(result).toBeDefined();
    expect(typeof result.getStream).toBe('function');
  });

  it('should throw an error if the repository fails to return a streamable file', async () => {
    fileRepository.getFileStream.mockRejectedValueOnce(new Error('Failed to get file stream'));

    const input: GetFileStreamInputDto = {
      bucket: 'test-bucket',
      fileName: 'test-file.txt',
    };

    await expect(useCase.execute(input)).rejects.toThrow('Failed to get file stream');
  });
});
