import { Module } from '@nestjs/common';
import { typeormPGProvider } from './typeorm-pg.provider';
import { SharedModule } from '../shared/shared.module';

@Module({
  imports: [SharedModule],
  providers: [typeormPGProvider],
  exports: [typeormPGProvider],
})
export class DatabaseModule {}
