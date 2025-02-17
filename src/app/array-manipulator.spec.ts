import { TestBed } from '@angular/core/testing';
import { ArrayManipulator } from './array-manipulator';

describe('Test for ArrayManipulator', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ArrayManipulator]
    });
  });

  describe('Test for removeDuplicates', () => {
    it('should remove duplicate numbers', () => {
      expect(TestBed.inject(ArrayManipulator).removeDuplicates([1, 2, 2, 3, 3, 4]))
        .toEqual([1, 2, 3, 4]);
    });

    it('should handle empty array', () => {
      expect(TestBed.inject(ArrayManipulator).removeDuplicates([]))
        .toEqual([]);
    });

    it('should work with strings', () => {
      expect(TestBed.inject(ArrayManipulator).removeDuplicates(['a', 'b', 'a', 'c']))
        .toEqual(['a', 'b', 'c']);
    });
  });

  describe('Test for mostFrequent', () => {
    it('should find most frequent number', () => {
      expect(TestBed.inject(ArrayManipulator).mostFrequent([1, 2, 2, 3, 2, 4]))
        .toBe(2);
    });

    it('should return null for empty array', () => {
      expect(TestBed.inject(ArrayManipulator).mostFrequent([]))
        .toBeNull();
    });

    it('should handle ties by returning first occurrence', () => {
      expect(TestBed.inject(ArrayManipulator).mostFrequent([1, 1, 2, 2]))
        .toBe(1);
    });
  });

  describe('Test for rotate', () => {
    it('should rotate array right by 2 positions', () => {
      expect(TestBed.inject(ArrayManipulator).rotate([1, 2, 3, 4, 5], 2))
        .toEqual([4, 5, 1, 2, 3]);
    });

    it('should handle empty array', () => {
      expect(TestBed.inject(ArrayManipulator).rotate([], 3))
        .toEqual([]);
    });

    it('should handle rotation larger than array length', () => {
      expect(TestBed.inject(ArrayManipulator).rotate([1, 2, 3], 5))
        .toEqual([2, 3, 1]);
    });
  });

  describe('Test for intersection', () => {
    it('should find common elements', () => {
      expect(TestBed.inject(ArrayManipulator).intersection([1, 2, 3], [2, 3, 4]))
        .toEqual([2, 3]);
    });

    it('should return empty array when no common elements', () => {
      expect(TestBed.inject(ArrayManipulator).intersection([1, 2], [3, 4]))
        .toEqual([]);
    });

    it('should work with empty arrays', () => {
      expect(TestBed.inject(ArrayManipulator).intersection([], [1, 2]))
        .toEqual([]);
    });
  });

  describe('Test for groupBy', () => {
    it('should group numbers by parity', () => {
      const result = TestBed.inject(ArrayManipulator).groupBy(
        [1, 2, 3, 4],
        (n) => n % 2 === 0 ? 'even' : 'odd'
      );
      expect(result).toEqual({
        odd: [1, 3],
        even: [2, 4]
      });
    });

    it('should handle empty array', () => {
      expect(TestBed.inject(ArrayManipulator).groupBy<number>([], (n: number) => n.toString()))
        .toEqual({});
    });

    it('should group strings by length', () => {
      const result = TestBed.inject(ArrayManipulator).groupBy(
        ['a', 'bb', 'ccc'],
        (s) => s.length.toString()
      );
      expect(result).toEqual({
        '1': ['a'],
        '2': ['bb'],
        '3': ['ccc']
      });
    });
  });

  describe('Test for flatten', () => {
    it('should flatten nested array', () => {
      expect(TestBed.inject(ArrayManipulator).flatten([1, [2, 3], [4, [5, 6]]]))
        .toEqual([1, 2, 3, 4, 5, 6]);
    });

    it('should handle empty arrays', () => {
      expect(TestBed.inject(ArrayManipulator).flatten([]))
        .toEqual([]);
    });

    it('should handle already flat array', () => {
      expect(TestBed.inject(ArrayManipulator).flatten([1, 2, 3]))
        .toEqual([1, 2, 3]);
    });
  });

  describe('Test for uniqueElements', () => {
    it('should find elements present in only one array', () => {
      expect(TestBed.inject(ArrayManipulator).uniqueElements([1, 2, 3], [2, 3, 4]))
        .toEqual([1, 4]);
    });

    it('should handle empty arrays', () => {
      expect(TestBed.inject(ArrayManipulator).uniqueElements([], [1, 2]))
        .toEqual([1, 2]);
    });

    it('should return empty array for identical arrays', () => {
      expect(TestBed.inject(ArrayManipulator).uniqueElements([1, 2], [1, 2]))
        .toEqual([]);
    });
  });

  describe('Additional Jasmine Matchers', () => {
    it('test array type checking', () => {
      const manipulator = TestBed.inject(ArrayManipulator);
      const result = manipulator.removeDuplicates([1, 2, 2, 3]);

      expect(Array.isArray(result)).toBeTrue();
      expect(result.length).toBe(3);
      expect(result).toBeDefined();
      expect(result).not.toBeNull();
    });

    it('test object matchers', () => {
      const result = TestBed.inject(ArrayManipulator).groupBy(
        [1, 2],
        (n) => n.toString()
      );

      expect(result).toBeDefined();
      expect(result).toEqual(jasmine.any(Object));
      expect(Object.keys(result).length).toBe(2);
    });

    it('test error handling', () => {
      expect(() => {
        TestBed.inject(ArrayManipulator).flatten(null as any);
      }).toThrow();
    });
  });
});
