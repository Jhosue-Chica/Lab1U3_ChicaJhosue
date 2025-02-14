import { TestBed } from '@angular/core/testing';
import { NumberProcessor } from './number-processor';

describe('Test for NumberProcessor', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NumberProcessor]
    });
  });

  describe('Test for sum', () => {
    it('should sum array of numbers', () => {
      expect(TestBed.inject(NumberProcessor).sum([1, 2, 3])).toBe(6);
    });

    it('should return 0 for empty array', () => {
      expect(TestBed.inject(NumberProcessor).sum([])).toBe(0);
    });

    it('should work with negative numbers', () => {
      expect(TestBed.inject(NumberProcessor).sum([-1, 1])).toBe(0);
    });
  });

  describe('Test for average', () => {
    it('should calculate average correctly', () => {
      expect(TestBed.inject(NumberProcessor).average([2, 4, 6])).toBe(4);
    });

    it('should return 0 for empty array', () => {
      expect(TestBed.inject(NumberProcessor).average([])).toBe(0);
    });

    it('should work with decimal results', () => {
      expect(TestBed.inject(NumberProcessor).average([1, 2])).toBe(1.5);
    });
  });

  describe('Test for max', () => {
    it('should find maximum number', () => {
      expect(TestBed.inject(NumberProcessor).max([1, 5, 3])).toBe(5);
    });

    it('should return negative infinity for empty array', () => {
      expect(TestBed.inject(NumberProcessor).max([])).toBe(Number.NEGATIVE_INFINITY);
    });

    it('should work with negative numbers', () => {
      expect(TestBed.inject(NumberProcessor).max([-3, -1, -4])).toBe(-1);
    });
  });

  describe('Test for isEven', () => {
    it('should return true for even numbers', () => {
      expect(TestBed.inject(NumberProcessor).isEven(2)).toBeTrue();
    });

    it('should return false for odd numbers', () => {
      expect(TestBed.inject(NumberProcessor).isEven(3)).toBeFalse();
    });

    it('should work with zero', () => {
      expect(TestBed.inject(NumberProcessor).isEven(0)).toBeTrue();
    });

    it('should work with negative numbers', () => {
      expect(TestBed.inject(NumberProcessor).isEven(-4)).toBeTrue();
      expect(TestBed.inject(NumberProcessor).isEven(-3)).toBeFalse();
    });
  });

  describe('Additional Jasmine Matchers', () => {
    it('test array matchers', () => {
      const numbers = [1, 2, 3, 4, 5];
      expect(numbers).toContain(3);
      expect(numbers.length).toBe(5);
      expect(numbers).toBeDefined();
      expect(numbers).not.toBeNull();
    });

    it('test number matchers', () => {
      const result = TestBed.inject(NumberProcessor).average([1, 2, 3]);
      expect(result).toBeCloseTo(2, 0);
      expect(result).toBeLessThan(3);
      expect(result).toBeGreaterThan(1);
    });
  });
});
