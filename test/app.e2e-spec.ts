import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from 'src/app.module';
import { createMicroservice } from 'src/main_test';

describe('File Processing (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();

    const appConsumer = await createMicroservice(app);
    await appConsumer.listen();

    await app.listen(3000);
  });

  afterEach(async () => {
    await app.close();
  });

  it('should upload a file and then query the orders', async () => {
    const mockLines = [
      '0000000070                              Palmer Prosacco00000007530000000003     1836.7420210308',
      '0000000075                                  Bobbie Batz00000007980000000002     1578.5720211116',
      '0000000075                                  Bobbie Batz00000007980000000002     1578.5720211116',
    ];
    const file = {
      fieldname: 'file',
      originalname: 'test.txt',
      encoding: '7bit',
      mimetype: 'text/plain',
      buffer: Buffer.from(mockLines.join('\n')),
    };

    const uploadResponse = await request(app.getHttpServer())
      .post('/files/import')
      .attach('file', file.buffer, file.originalname)
      .expect(201);

    const fileUrl = uploadResponse.body.fileUrl;

    const ordersResponse = await request(app.getHttpServer()).get('/orders').query({ page: 1, limit: 10 }).expect(200);

    expect(ordersResponse.body).toBeDefined();
    expect(fileUrl).toContain('http://');
  });
});
