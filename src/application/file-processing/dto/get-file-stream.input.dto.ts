import { UploadEvent } from 'src/domain/file-processing/types/upload-event.type';

export type GetFileStreamInputDto = Pick<UploadEvent, 'bucket' | 'fileName'>;
