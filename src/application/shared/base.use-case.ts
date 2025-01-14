export default interface BaseUseCase<Input, Output> {
  execute(input: Input): Output | Promise<Output>;
}
