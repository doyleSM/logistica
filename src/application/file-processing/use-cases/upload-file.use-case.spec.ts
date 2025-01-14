import { FileRepository } from 'src/domain/file-processing/interfaces/file-repository.interface';
import { UploadFileUseCase } from './upload-file.use-case';
import { ConfigService } from 'src/infra/shared/services/config.service';
import { mock, MockProxy } from 'jest-mock-extended';
import { UploadFileInputDto } from '../dto/upload-file.input.dto';
import { UploadFileOutputDto } from '../dto/upload-file.output.dto ';

describe('UploadFileUseCase', () => {
  let useCase: UploadFileUseCase;
  let fileRepository: MockProxy<FileRepository>;
  let configService: MockProxy<ConfigService>;

  beforeEach(() => {
    configService = mock();
    fileRepository = mock();
    useCase = new UploadFileUseCase(fileRepository, configService);
  });

  it('should upload a file and return the file URL, name, and bucket', async () => {
    fileRepository.uploadFile.mockResolvedValueOnce({
      url: 'https://s3.example.com/uploads/test-file.png',
    });
    configService.get.mockReturnValueOnce('mock-bucket-name');
    const input: UploadFileInputDto = {
      buffer: Buffer.from('mock file content'),
      mimetype: 'image/png',
      name: 'test-file.png',
      originalname: 'test-file.png',
    };

    const result: UploadFileOutputDto = await useCase.execute(input);

    expect(fileRepository.uploadFile).toHaveBeenCalledWith(
      {
        buffer: input.buffer,
        mimetype: input.mimetype,
        name: input.name,
        originalname: input.originalname,
      },
      'mock-bucket-name',
    );

    expect(result).toEqual({
      fileUrl: 'https://s3.example.com/uploads/test-file.png',
      fileName: input.originalname,
      bucket: 'mock-bucket-name',
    });
  });

  it('should throw an error if the file upload fails', async () => {
    fileRepository.uploadFile.mockRejectedValueOnce(new Error('Failed to upload file'));
    const input: UploadFileInputDto = {
      buffer: Buffer.from('mock file content'),
      mimetype: 'image/png',
      name: 'test-file.png',
      originalname: 'test-file.png',
    };

    await expect(useCase.execute(input)).rejects.toThrow('Failed to upload file');
  });
});
