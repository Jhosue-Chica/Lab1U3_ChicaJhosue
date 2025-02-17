import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Calculator } from '../calculator';
import { NumberProcessor } from '../number-processor';
import { StringManipulator } from '../string-manipulator';
import { ArrayManipulator } from '../array-manipulator';

@Component({
  selector: 'app-pruebas',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './pruebas.component.html',
  styleUrls: ['./pruebas.component.css'],
  providers: [Calculator, NumberProcessor, StringManipulator, ArrayManipulator]
})
export class PruebasComponent {
  // Variables para Calculator
  numberA: number = 0;
  numberB: number = 0;
  calculatorResult: number = 0;

  // Variables para NumberProcessor
  numberArray: number[] = [];
  numberInput: string = '';
  numberProcessorResult: any = null;

  // Variables para StringManipulator
  textA: string = '';
  textB: string = '';
  repetitions: number = 0;
  stringResult: any = null;

  // Variables para ArrayManipulator
  array1: any[] = [];
  array2: any[] = [];
  arrayInput1: string = '';
  arrayInput2: string = '';
  arrayResult: any = null;
  positions: number = 0;

  constructor(
    private calculator: Calculator,
    private numberProcessor: NumberProcessor,
    private stringManipulator: StringManipulator,
    private arrayManipulator: ArrayManipulator
  ) {}

  // Métodos Calculator
  calculate(operation: string) {
    switch (operation) {
      case 'add':
        this.calculatorResult = this.calculator.add(this.numberA, this.numberB);
        break;
      case 'subtract':
        this.calculatorResult = this.calculator.subtract(this.numberA, this.numberB);
        break;
      case 'multiply':
        this.calculatorResult = this.calculator.multiply(this.numberA, this.numberB);
        break;
      case 'divide':
        this.calculatorResult = this.calculator.divide(this.numberA, this.numberB);
        break;
      case 'sqrt':
        this.calculatorResult = this.calculator.squareRoot(this.numberA);
        break;
    }
  }

  // Métodos NumberProcessor
  addNumberToArray() {
    if (this.numberInput.trim()) {
      this.numberArray.push(Number(this.numberInput));
      this.numberInput = '';
    }
  }

  processNumbers(operation: string) {
    switch (operation) {
      case 'sum':
        this.numberProcessorResult = this.numberProcessor.sum(this.numberArray);
        break;
      case 'average':
        this.numberProcessorResult = this.numberProcessor.average(this.numberArray);
        break;
      case 'max':
        this.numberProcessorResult = this.numberProcessor.max(this.numberArray);
        break;
      case 'isEven':
        this.numberProcessorResult = this.numberProcessor.isEven(this.numberArray[0]);
        break;
    }
  }

  // Métodos StringManipulator
  processString(operation: string) {
    switch (operation) {
      case 'concatenate':
        this.stringResult = this.stringManipulator.concatenate(this.textA, this.textB);
        break;
      case 'repeat':
        this.stringResult = this.stringManipulator.repeat(this.textA, this.repetitions);
        break;
      case 'reverse':
        this.stringResult = this.stringManipulator.reverse(this.textA);
        break;
      case 'countVowels':
        this.stringResult = this.stringManipulator.countVowels(this.textA);
        break;
      case 'countConsonants':
        this.stringResult = this.stringManipulator.countConsonants(this.textA);
        break;
      case 'countWords':
        this.stringResult = this.stringManipulator.countWords(this.textA);
        break;
      case 'countCharacters':
        this.stringResult = this.stringManipulator.countCharacters(this.textA);
        break;
    }
  }

  // Métodos ArrayManipulator
  addToArray(arrayNum: number) {
    const input = arrayNum === 1 ? this.arrayInput1 : this.arrayInput2;
    const array = arrayNum === 1 ? this.array1 : this.array2;

    if (input.trim()) {
      const values = input.split(',').map(v => v.trim());
      array.push(...values);
      if (arrayNum === 1) {
        this.arrayInput1 = '';
      } else {
        this.arrayInput2 = '';
      }
    }
  }

  processArray(operation: string) {
    switch (operation) {
      case 'removeDuplicates':
        this.arrayResult = this.arrayManipulator.removeDuplicates(this.array1);
        break;
      case 'mostFrequent':
        this.arrayResult = this.arrayManipulator.mostFrequent(this.array1);
        break;
      case 'rotate':
        this.arrayResult = this.arrayManipulator.rotate(this.array1, this.positions);
        break;
      case 'intersection':
        this.arrayResult = this.arrayManipulator.intersection(this.array1, this.array2);
        break;
      case 'uniqueElements':
        this.arrayResult = this.arrayManipulator.uniqueElements(this.array1, this.array2);
        break;
      case 'flatten':
        this.arrayResult = this.arrayManipulator.flatten(this.array1);
        break;
    }
  }

  clearArrays() {
    this.array1 = [];
    this.array2 = [];
    this.arrayResult = null;
  }

  clearNumbers() {
    this.numberArray = [];
    this.numberProcessorResult = null;
  }
}
