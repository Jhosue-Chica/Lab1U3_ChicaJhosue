export class NumberProcessor {
  sum(numbers: number[]): number {
    return numbers.reduce((acc, curr) => acc + curr, 0);
  }

  average(numbers: number[]): number {
    if (numbers.length === 0) return 0;
    return this.sum(numbers) / numbers.length;
  }

  max(numbers: number[]): number {
    if (numbers.length === 0) return Number.NEGATIVE_INFINITY;
    return Math.max(...numbers);
  }

  isEven(number: number): boolean {
    return number % 2 === 0;
  }
}
