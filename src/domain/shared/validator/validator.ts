export default class Validator {
  static combine(...errors: (string | null)[]): string[] | null {
    const filteredErrors = errors.filter((error) => error !== null) as string[];
    return filteredErrors.length > 0 ? filteredErrors : null;
  }

  static notNull(valor: any, error: string): string | null {
    return valor !== null && valor !== undefined ? null : error;
  }

  static notEmpty(valor: string | null | undefined, error: string): string | null {
    if (Validator.notNull(valor, error)) return error;
    return valor!.trim() !== '' ? null : error;
  }

  static lessThan(value: string | number | any[], maxLenght: number, error: string): string | null {
    if (typeof value === 'number') {
      return value.toString().length < maxLenght ? null : error;
    }
    return value?.length < maxLenght ? null : error;
  }

  static greaterThan(value: string | number | any[], minLenght: number, error: string): string | null {
    if (typeof value === 'number') {
      return value.toString().length > minLenght ? null : error;
    }
    return value.length > minLenght ? null : error;
  }

  static minVal(value: number, min: number, error: string): string | null {
    return value >= min ? null : error;
  }
  static validStringDate(value: string, error: string): string | null {
    if (value.length !== 8) return error;
    const parsedDate = `${value.substring(0, 4)}-${value.substring(4, 6)}-${value.substring(6, 8)}`;
    return new Date(parsedDate).toString() === 'Invalid Date' ? error : null;
  }
}
