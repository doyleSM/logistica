import { Provider } from '@nestjs/common';
import { FILES_PROCESSING_CONSTANTS } from '../constants';

import { ProcessFileStreamUseCase } from 'src/application/file-processing/use-cases/process-stream-file.use-case';
import { CreateOrderBatchUseCase } from 'src/application/orders/use-cases/create-order-batch.use-case';
import { ORDER_CONSTANTS } from 'src/infra/orders/constants';

const useFactory = (createOrderBatchUseCase: CreateOrderBatchUseCase) =>
  new ProcessFileStreamUseCase(createOrderBatchUseCase);

export const ProcessFileStreamUseCaseFactory: Provider = {
  provide: FILES_PROCESSING_CONSTANTS.PROCESS_STREAM_FILE,
  useFactory,
  inject: [ORDER_CONSTANTS.CREATE_ORDER_BATCH_USE_CASE],
};
