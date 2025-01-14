import { GetObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Upload } from '@aws-sdk/lib-storage';
import {
  FileRepository,
  InputUploadFile,
  IStreamableFile,
} from 'src/domain/file-processing/interfaces/file-repository.interface';
import { Readable } from 'stream';

@Injectable()
export class AWSFileProcessingProvider implements FileRepository {
  client: S3Client;
  constructor(@Inject(ConfigService) private readonly configService: ConfigService) {
    this.client = new S3Client({
      forcePathStyle: false,
      endpoint: this.configService.get('S3_ENDPOINT'),
      region: 'us-east-1',
      credentials: {
        accessKeyId: this.configService.get('AWS_ACCESS_KEY_ID'),
        secretAccessKey: this.configService.get('AWS_SECRET_ACCESS_KEY'),
      },
    });
  }

  async uploadFile(file: InputUploadFile, bucket: string): Promise<{ url: string }> {
    const parallelUploads3 = new Upload({
      client: this.client,
      queueSize: 4,
      leavePartsOnError: false,
      params: {
        Bucket: bucket,
        Key: `${file.originalname}`,
        Body: file.buffer,
      },
    });

    const { Location } = await parallelUploads3.done();
    return { url: Location };
  }

  async getFileStream(bucketName: string, key: string): Promise<IStreamableFile> {
    const command = new GetObjectCommand({ Bucket: bucketName, Key: key });
    const response = await this.client.send(command);

    const stream = response.Body as Readable;
    if (!stream) {
      throw new Error('No stream returned from S3');
    }

    return {
      getStream: () => stream,
    };
  }
}
