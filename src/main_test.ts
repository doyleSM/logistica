import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';

const url = `amqp://${process.env.RABBITMQ_USER}:${process.env.RABBITMQ_PASS}@${process.env.RABBITMQ_HOST}:${process.env.RABBITMQ_PORT}`;

async function createApp() {
  return NestFactory.create(AppModule);
}

async function createMicroservice(app: any) {
  return app.connectMicroservice({
    transport: Transport.RMQ,
    options: {
      urls: [url],
      queue: process.env.RABBIT_FILES_QUEUE_NAME,
      queueOptions: {
        durable: true,
      },
    },
  });
}

async function bootstrap() {
  const app = await createApp();
  const appConsumer = await createMicroservice(app);
  await appConsumer.listen();
  await app.listen(process.env.PORT ?? 3000);
}

export { bootstrap, createApp, createMicroservice };
