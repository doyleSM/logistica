import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

const url = `amqp://${process.env.RABBITMQ_USER}:${process.env.RABBITMQ_PASS}@${process.env.RABBITMQ_HOST}:${process.env.RABBITMQ_PORT}`;
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const appConsumer = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.RMQ,
    options: {
      urls: [url],
      queue: process.env.RABBIT_FILES_QUEUE_NAME,
      queueOptions: {
        durable: true,
      },
    },
  });

  const config = new DocumentBuilder()
    .setTitle('LuizaLabs - Desafio técnico - Vertical Logística')
    .setDescription('API para importação de pedidos de compra')
    .setVersion('1.0')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, documentFactory);

  appConsumer.listen();
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
