import 'reflect-metadata';
import { DataSource } from 'typeorm';
import 'dotenv/config';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.POSTGRES_HOST ?? 'localhost',
  port: Number(process.env.POSTGRES_PORT ?? 5432),
  username: process.env.POSTGRES_USER ?? 'root',
  password: process.env.POSTGRES_PASSWORD ?? 'root',
  database: process.env.POSTGRES_DB ?? 'test',
  entities: ['src/infra/database/entities/*.entity.{ts,js}'],
  migrations: ['src/infra/database/migrations/*'],
});
