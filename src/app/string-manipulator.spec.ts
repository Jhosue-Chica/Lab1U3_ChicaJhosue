import { TestBed } from '@angular/core/testing';
import { StringManipulator } from './string-manipulator';

describe('Test for StringManipulator', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StringManipulator]
    });
  });

  describe('Test for concatenate', () => {
    it('should concatenate two strings', () => {
      expect(TestBed.inject(StringManipulator).concatenate('Hello', 'World')).toBe('HelloWorld');
    });

    it('should work with empty strings', () => {
      expect(TestBed.inject(StringManipulator).concatenate('', 'test')).toBe('test');
    });

    it('should work with spaces', () => {
      expect(TestBed.inject(StringManipulator).concatenate('Hello ', 'World')).toBe('Hello World');
    });
  });

  describe('Test for repeat', () => {
    it('should repeat string 3 times', () => {
      expect(TestBed.inject(StringManipulator).repeat('ha', 3)).toBe('hahaha');
    });

    it('should return empty string when times is 0', () => {
      expect(TestBed.inject(StringManipulator).repeat('test', 0)).toBe('');
    });

    it('should work with empty string', () => {
      expect(TestBed.inject(StringManipulator).repeat('', 5)).toBe('');
    });
  });

  describe('Test for reverse', () => {
    it('should reverse a string', () => {
      expect(TestBed.inject(StringManipulator).reverse('hello')).toBe('olleh');
    });

    it('should work with palindromes', () => {
      expect(TestBed.inject(StringManipulator).reverse('radar')).toBe('radar');
    });

    it('should work with empty string', () => {
      expect(TestBed.inject(StringManipulator).reverse('')).toBe('');
    });
  });

  describe('Test for countVowels', () => {
    it('should count vowels correctly', () => {
      expect(TestBed.inject(StringManipulator).countVowels('hello')).toBe(2);
    });

    it('should return 0 for strings without vowels', () => {
      expect(TestBed.inject(StringManipulator).countVowels('cry')).toBe(0);
    });

    it('should work with uppercase vowels', () => {
      expect(TestBed.inject(StringManipulator).countVowels('AeIoU')).toBe(5);
    });
  });
});
