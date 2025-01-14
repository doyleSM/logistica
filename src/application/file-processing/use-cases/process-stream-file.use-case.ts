import { CreateOrderBatchUseCase } from 'src/application/orders/use-cases/create-order-batch.use-case';
import BaseUseCase from 'src/application/shared/base.use-case';
import { IStreamableFile } from 'src/domain/file-processing/interfaces/file-repository.interface';
import { Customer } from 'src/domain/orders/entities/customer';
import { Order } from 'src/domain/orders/entities/order';
import { OrderItem } from 'src/domain/orders/entities/order-item';
import * as readline from 'readline';
const DEFAULT_BATCH_SIZE = 200;
export class ProcessFileStreamUseCase implements BaseUseCase<IStreamableFile, void> {
  private ordersBatch: Order[] = [];
  private BATCH_SIZE = DEFAULT_BATCH_SIZE;
  constructor(
    private readonly createOrderBatchUseCase: CreateOrderBatchUseCase,
    batchSize?: number,
  ) {
    if (batchSize) {
      this.BATCH_SIZE = batchSize;
    }
  }

  async execute(payload: IStreamableFile): Promise<void> {
    this.ordersBatch = [];
    console.time('ProcessFileStreamUseCase');
    const stream = payload.getStream();

    const rl = readline.createInterface({
      input: stream,
      crlfDelay: Infinity,
    });

    for await (const linha of rl) {
      const order = this.createEntity(linha);
      this.ordersBatch.push(order);
      if (this.ordersBatch.length === this.BATCH_SIZE) {
        await this.createOrderBatchUseCase.execute(this.ordersBatch);
        this.ordersBatch = [];
      }
    }
    if (this.ordersBatch.length > 0) {
      await this.createOrderBatchUseCase.execute(this.ordersBatch);
    }
    console.timeEnd('ProcessFileStreamUseCase');
  }

  private createEntity(line: string): Order {
    const customerId = line.substring(0, 10).trim();
    const customerName = line.substring(10, 55).trim();
    const orderId = line.substring(55, 65).trim();
    const productId = line.substring(65, 75).trim();
    const productValue = line.substring(75, 87).trim();
    const date = line.substring(87, 95).trim();

    const customer = new Customer({ id: parseInt(customerId), name: customerName });
    const orderItem = new OrderItem({
      product_id: parseInt(productId),
      value: parseFloat(productValue),
      order_id: parseInt(orderId),
    });
    const order = new Order({ id: parseInt(orderId), date, customer, items: [orderItem] });
    return order;
  }
}
