export class Calculator {
  multiply(numberA: number, numberB: number): number {
    return numberA * numberB;
  }
  divide(numberA: number, numberB: number): number {
    return numberA / numberB;
  }

  add(numberA: number, numberB: number): number {
    return numberA + numberB;
  }

  subtract(numberA: number, numberB: number): number {
    return numberA - numberB;
  }

  squareRoot(number: number): number {
    return Math.sqrt(number);
  }


}
