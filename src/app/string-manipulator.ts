export class StringManipulator {
  concatenate(textA: string, textB: string): string {
    return textA + textB;
  }

  repeat(text: string, times: number): string {
    return text.repeat(times);
  }

  reverse(text: string): string {
    return text.split('').reverse().join('');
  }

  countVowels(text: string): number {
    return (text.match(/[aeiou]/gi) || []).length;
  }
}
