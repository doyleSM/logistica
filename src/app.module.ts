import { forwardRef, Module } from '@nestjs/common';
import { FilesProcessingModule } from './infra/file-processing/file-processing.module';
import { SharedModule } from './infra/shared/shared.module';
import { OrderModule } from './infra/orders/order.module';

@Module({
  imports: [forwardRef(() => FilesProcessingModule), forwardRef(() => SharedModule), forwardRef(() => OrderModule)],
  controllers: [],
  providers: [],
})
export class AppModule {}
