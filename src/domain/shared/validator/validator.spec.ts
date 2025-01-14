import Validator from './validator';

describe('Validator', () => {
  describe('combine', () => {
    it('should return null if all errors are null', () => {
      expect(Validator.combine(null, null)).toBeNull();
    });

    it('should return an array of errors if there are any non-null errors', () => {
      expect(Validator.combine('error1', null, 'error2')).toEqual(['error1', 'error2']);
    });
  });

  describe('notNull', () => {
    it('should return null if the value is not null or undefined', () => {
      expect(Validator.notNull('value', 'error')).toBeNull();
    });

    it('should return the error if the value is null or undefined', () => {
      expect(Validator.notNull(null, 'error')).toBe('error');
      expect(Validator.notNull(undefined, 'error')).toBe('error');
    });
  });

  describe('notEmpty', () => {
    it('should return null if the value is not empty', () => {
      expect(Validator.notEmpty('value', 'error')).toBeNull();
    });

    it('should return the error if the value is empty', () => {
      expect(Validator.notEmpty('', 'error')).toBe('error');
      expect(Validator.notEmpty('   ', 'error')).toBe('error');
    });

    it('should return the error if the value is null or undefined', () => {
      expect(Validator.notEmpty(null, 'error')).toBe('error');
      expect(Validator.notEmpty(undefined, 'error')).toBe('error');
    });
  });

  describe('lessThan', () => {
    it('should return null if the value length is less than maxLength', () => {
      expect(Validator.lessThan('123', 5, 'error')).toBeNull();
      expect(Validator.lessThan(123, 5, 'error')).toBeNull();
      expect(Validator.lessThan([1, 2, 3], 5, 'error')).toBeNull();
    });

    it('should return the error if the value length is not less than maxLength', () => {
      expect(Validator.lessThan('12345', 5, 'error')).toBe('error');
      expect(Validator.lessThan(12345, 5, 'error')).toBe('error');
      expect(Validator.lessThan([1, 2, 3, 4, 5], 5, 'error')).toBe('error');
    });
  });

  describe('greaterThan', () => {
    it('should return null if the value length is greater than minLength', () => {
      expect(Validator.greaterThan('12345', 3, 'error')).toBeNull();
      expect(Validator.greaterThan(12345, 3, 'error')).toBeNull();
      expect(Validator.greaterThan([1, 2, 3, 4, 5], 3, 'error')).toBeNull();
    });

    it('should return the error if the value length is not greater than minLength', () => {
      expect(Validator.greaterThan('12', 3, 'error')).toBe('error');
      expect(Validator.greaterThan(12, 3, 'error')).toBe('error');
      expect(Validator.greaterThan([1, 2], 3, 'error')).toBe('error');
    });
  });
  describe('minVal', () => {
    it('should return null if the value is greater than or equal to min', () => {
      expect(Validator.minVal(5, 3, 'error')).toBeNull();
    });

    it('should return the error if the value is less than min', () => {
      expect(Validator.minVal(2, 3, 'error')).toBe('error');
    });
    describe('validStringDate', () => {
      it('should return null if the value is a valid date', () => {
        expect(Validator.validStringDate('20210101', 'error')).toBeNull();
      });

      it('should return the error if the value is not a valid date', () => {
        expect(Validator.validStringDate('20210132', 'error')).toBe('error');
      });
    });
  });
});
