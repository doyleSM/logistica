import BaseUseCase from 'src/application/shared/base.use-case';
import { FileRepository, IStreamableFile } from 'src/domain/file-processing/interfaces/file-repository.interface';
import { GetFileStreamInputDto } from '../dto/get-file-stream.input.dto';

export class GetFileStreamUseCase implements BaseUseCase<GetFileStreamInputDto, IStreamableFile> {
  constructor(private readonly fileRepository: FileRepository) {}

  async execute({ bucket, fileName }: GetFileStreamInputDto): Promise<IStreamableFile> {
    const stream = await this.fileRepository.getFileStream(bucket, fileName);
    return stream;
  }
}
