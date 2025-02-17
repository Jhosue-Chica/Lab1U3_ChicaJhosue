import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PruebasComponent } from './pruebas.component';
import { FormsModule } from '@angular/forms';
import { Calculator } from '../calculator';
import { NumberProcessor } from '../number-processor';
import { StringManipulator } from '../string-manipulator';
import { ArrayManipulator } from '../array-manipulator';

describe('PruebasComponent', () => {
  let component: PruebasComponent;
  let fixture: ComponentFixture<PruebasComponent>;
  let calculator: Calculator;
  let numberProcessor: NumberProcessor;
  let stringManipulator: StringManipulator;
  let arrayManipulator: ArrayManipulator;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PruebasComponent, FormsModule],
      providers: [Calculator, NumberProcessor, StringManipulator, ArrayManipulator]
    }).compileComponents();

    fixture = TestBed.createComponent(PruebasComponent);
    component = fixture.componentInstance;
    calculator = TestBed.inject(Calculator);
    numberProcessor = TestBed.inject(NumberProcessor);
    stringManipulator = TestBed.inject(StringManipulator);
    arrayManipulator = TestBed.inject(ArrayManipulator);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Calculator Tests
  describe('Calculator Operations', () => {
    beforeEach(() => {
      component.numberA = 10;
      component.numberB = 5;
    });

    it('should perform addition', () => {
      spyOn(calculator, 'add').and.callThrough();
      component.calculate('add');
      expect(calculator.add).toHaveBeenCalledWith(10, 5);
      expect(component.calculatorResult).toBe(15);
    });

    it('should perform subtraction', () => {
      spyOn(calculator, 'subtract').and.callThrough();
      component.calculate('subtract');
      expect(calculator.subtract).toHaveBeenCalledWith(10, 5);
      expect(component.calculatorResult).toBe(5);
    });

    it('should perform multiplication', () => {
      spyOn(calculator, 'multiply').and.callThrough();
      component.calculate('multiply');
      expect(calculator.multiply).toHaveBeenCalledWith(10, 5);
      expect(component.calculatorResult).toBe(50);
    });

    it('should perform division', () => {
      spyOn(calculator, 'divide').and.callThrough();
      component.calculate('divide');
      expect(calculator.divide).toHaveBeenCalledWith(10, 5);
      expect(component.calculatorResult).toBe(2);
    });

    it('should calculate square root', () => {
      spyOn(calculator, 'squareRoot').and.callThrough();
      component.calculate('sqrt');
      expect(calculator.squareRoot).toHaveBeenCalledWith(10);
      expect(component.calculatorResult).toBeCloseTo(3.162, 3);
    });

    it('should handle invalid operation', () => {
      const initialResult = component.calculatorResult;
      component.calculate('invalid');
      expect(component.calculatorResult).toBe(initialResult);
    });
  });

  // Number Processor Tests
  describe('Number Processor Operations', () => {
    beforeEach(() => {
      component.numberArray = [1, 2, 3, 4, 5];
    });

    it('should add number to array', () => {
      component.numberInput = '6';
      component.addNumberToArray();
      expect(component.numberArray).toContain(6);
      expect(component.numberInput).toBe('');
    });

    it('should not add empty input to array', () => {
      const initialLength = component.numberArray.length;
      component.numberInput = ' ';
      component.addNumberToArray();
      expect(component.numberArray.length).toBe(initialLength);
    });

    it('should calculate sum', () => {
      spyOn(numberProcessor, 'sum').and.callThrough();
      component.processNumbers('sum');
      expect(numberProcessor.sum).toHaveBeenCalledWith(component.numberArray);
      expect(component.numberProcessorResult).toBe(15);
    });

    it('should calculate average', () => {
      spyOn(numberProcessor, 'average').and.callThrough();
      component.processNumbers('average');
      expect(numberProcessor.average).toHaveBeenCalledWith(component.numberArray);
      expect(component.numberProcessorResult).toBe(3);
    });

    it('should find maximum', () => {
      spyOn(numberProcessor, 'max').and.callThrough();
      component.processNumbers('max');
      expect(numberProcessor.max).toHaveBeenCalledWith(component.numberArray);
      expect(component.numberProcessorResult).toBe(5);
    });

    it('should check if number is even', () => {
      spyOn(numberProcessor, 'isEven').and.callThrough();
      component.processNumbers('isEven');
      expect(numberProcessor.isEven).toHaveBeenCalledWith(component.numberArray[0]);
      expect(component.numberProcessorResult).toBeFalse();
    });

    it('should clear numbers', () => {
      component.clearNumbers();
      expect(component.numberArray).toEqual([]);
      expect(component.numberProcessorResult).toBeNull();
    });
  });

  // String Manipulator Tests
  describe('String Manipulator Operations', () => {
    beforeEach(() => {
      component.textA = 'hello';
      component.textB = 'world';
      component.repetitions = 2;
    });

    it('should concatenate strings', () => {
      spyOn(stringManipulator, 'concatenate').and.callThrough();
      component.processString('concatenate');
      expect(stringManipulator.concatenate).toHaveBeenCalledWith('hello', 'world');
      expect(component.stringResult).toBe('helloworld');
    });

    it('should repeat string', () => {
      spyOn(stringManipulator, 'repeat').and.callThrough();
      component.processString('repeat');
      expect(stringManipulator.repeat).toHaveBeenCalledWith('hello', 2);
      expect(component.stringResult).toBe('hellohello');
    });

    it('should reverse string', () => {
      spyOn(stringManipulator, 'reverse').and.callThrough();
      component.processString('reverse');
      expect(stringManipulator.reverse).toHaveBeenCalledWith('hello');
      expect(component.stringResult).toBe('olleh');
    });

    it('should count vowels', () => {
      spyOn(stringManipulator, 'countVowels').and.callThrough();
      component.processString('countVowels');
      expect(stringManipulator.countVowels).toHaveBeenCalledWith('hello');
      expect(component.stringResult).toBe(2);
    });

    it('should count consonants', () => {
      spyOn(stringManipulator, 'countConsonants').and.callThrough();
      component.processString('countConsonants');
      expect(stringManipulator.countConsonants).toHaveBeenCalledWith('hello');
      expect(component.stringResult).toBe(3);
    });

    it('should count words', () => {
      component.textA = 'hello world';
      spyOn(stringManipulator, 'countWords').and.callThrough();
      component.processString('countWords');
      expect(stringManipulator.countWords).toHaveBeenCalledWith('hello world');
      expect(component.stringResult).toBe(2);
    });

    it('should count characters', () => {
      spyOn(stringManipulator, 'countCharacters').and.callThrough();
      component.processString('countCharacters');
      expect(stringManipulator.countCharacters).toHaveBeenCalledWith('hello');
      expect(component.stringResult).toBe(5);
    });
  });

  // Array Manipulator Tests
  describe('Array Manipulator Operations', () => {
    beforeEach(() => {
      component.array1 = ['a', 'b', 'c'];
      component.array2 = ['b', 'c', 'd'];
      component.positions = 1;
    });

    it('should add elements to array1', () => {
      component.arrayInput1 = 'd,e,f';
      component.addToArray(1);
      expect(component.array1).toContain('d');
      expect(component.array1).toContain('e');
      expect(component.array1).toContain('f');
      expect(component.arrayInput1).toBe('');
    });

    it('should add elements to array2', () => {
      component.arrayInput2 = 'e,f,g';
      component.addToArray(2);
      expect(component.array2).toContain('e');
      expect(component.array2).toContain('f');
      expect(component.array2).toContain('g');
      expect(component.arrayInput2).toBe('');
    });

    it('should not add empty input to arrays', () => {
      const initialLength1 = component.array1.length;
      const initialLength2 = component.array2.length;

      component.arrayInput1 = ' ';
      component.arrayInput2 = ' ';
      component.addToArray(1);
      component.addToArray(2);

      expect(component.array1.length).toBe(initialLength1);
      expect(component.array2.length).toBe(initialLength2);
    });

    it('should remove duplicates', () => {
      spyOn(arrayManipulator, 'removeDuplicates').and.callThrough();
      component.processArray('removeDuplicates');
      expect(arrayManipulator.removeDuplicates).toHaveBeenCalledWith(component.array1);
      expect(component.arrayResult).toEqual(['a', 'b', 'c']);
    });

    it('should find most frequent element', () => {
      spyOn(arrayManipulator, 'mostFrequent').and.callThrough();
      component.processArray('mostFrequent');
      expect(arrayManipulator.mostFrequent).toHaveBeenCalledWith(component.array1);
      expect(component.arrayResult).toBeDefined();
    });

    it('should rotate array', () => {
      spyOn(arrayManipulator, 'rotate').and.callThrough();
      component.processArray('rotate');
      expect(arrayManipulator.rotate).toHaveBeenCalledWith(component.array1, component.positions);
      expect(component.arrayResult).toEqual(['b', 'c', 'a']);
    });

    it('should find intersection', () => {
      spyOn(arrayManipulator, 'intersection').and.callThrough();
      component.processArray('intersection');
      expect(arrayManipulator.intersection).toHaveBeenCalledWith(component.array1, component.array2);
      expect(component.arrayResult).toEqual(['b', 'c']);
    });

    it('should find unique elements', () => {
      spyOn(arrayManipulator, 'uniqueElements').and.callThrough();
      component.processArray('uniqueElements');
      expect(arrayManipulator.uniqueElements).toHaveBeenCalledWith(component.array1, component.array2);
      expect(component.arrayResult).toEqual(['a', 'd']);
    });

    it('should flatten array', () => {
      component.array1 = [1, [2, 3], [4, [5, 6]]];
      spyOn(arrayManipulator, 'flatten').and.callThrough();
      component.processArray('flatten');
      expect(arrayManipulator.flatten).toHaveBeenCalledWith(component.array1);
      expect(component.arrayResult).toEqual([1, 2, 3, 4, 5, 6]);
    });

    it('should clear arrays', () => {
      component.clearArrays();
      expect(component.array1).toEqual([]);
      expect(component.array2).toEqual([]);
      expect(component.arrayResult).toBeNull();
    });
  });
});
