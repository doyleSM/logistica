import { DataSource } from 'typeorm';
import { ConfigService } from '../shared/services/config.service';

export const typeormPGProvider = {
  provide: 'DATA_SOURCE',
  inject: [ConfigService],
  useFactory: async (configService: ConfigService) => {
    const dataSource = new DataSource({
      type: 'postgres',
      host: configService.get('POSTGRES_HOST') || 'localhost',
      port: configService.getInt('POSTGRES_PORT') || 5432,
      username: configService.get('POSTGRES_USER') || 'root',
      password: configService.get('POSTGRES_PASSWORD') || 'root',
      database: configService.get('POSTGRES_DB') || 'test',
      entities: [__dirname + '/entities/*.entity.{ts,js}'],
      migrations: [__dirname + '/migrations'],
      // ssl: {
      //   rejectUnauthorized: true,
      //   ca: configService.get('POSTGRES_CA_CERT'),
      // },
      synchronize: false,
    });

    return dataSource.initialize();
  },
};
