export interface EventProducer<T> {
  publish(event: T, queue: string): Promise<void>;
}
