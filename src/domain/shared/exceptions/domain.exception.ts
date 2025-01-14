export class DomainException extends Error {
  code?: string;
  constructor(message: string, code?: string) {
    super(message);
    this.name = 'DomainException';
    this.code = code;
  }
}
