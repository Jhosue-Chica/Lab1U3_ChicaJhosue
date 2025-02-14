import { TestBed } from '@angular/core/testing';
import { Calculator } from './calculator';

describe('Test for Calculator', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Calculator]
    });
  });

  describe('Test for multiply', () => {
    it('should return 9', () => {
      // Arrange, Act & Assert
      expect(TestBed.inject(Calculator).multiply(3, 3)).toBe(9);
    });

    it('should return 0', () => {
      // Arrange, Act & Assert
      expect(TestBed.inject(Calculator).multiply(0, 3)).toBe(0);
    });
  });

  describe('Test for divide', () => {
    it('should return 3', () => {
      // Arrange, Act & Assert
      expect(TestBed.inject(Calculator).divide(9, 3)).toBe(3);
    });

    it('should return 0', () => {
      // Arrange, Act & Assert
      expect(TestBed.inject(Calculator).divide(0, 3)).toBe(0);
    });
  });

  describe('Jasmine Matchers', () => {
    it('test matchers', () => {
      let name = 'Luis';
      let name1;
      expect(name).toBeDefined();
      expect(name1).toBeUndefined();

      expect(1+1 === 2).toBeTruthy();
      expect(1+1 === 3).toBeFalsy();

      expect(5).toBeGreaterThan(4);
      expect(5).toBeGreaterThanOrEqual(5);
      expect(5).toBeLessThan(6);

      expect('123456').toMatch(/123/);

      expect(["apple", "orange", "banana"]).toContain("banana");
    });

  });

});
