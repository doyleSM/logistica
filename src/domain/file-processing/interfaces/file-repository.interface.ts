import { Readable } from 'stream';

export type InputUploadFile = {
  buffer: Buffer;
  mimetype: string;
  name: string;
  originalname: string;
};

export interface IStreamableFile {
  getStream(): Readable;
}

export interface FileRepository {
  uploadFile: (file: InputUploadFile, bucket: string) => Promise<{ url: string }>;
  getFileStream: (bucketName: string, key: string) => Promise<IStreamableFile>;
}
