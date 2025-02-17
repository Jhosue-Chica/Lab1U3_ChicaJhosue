export class StringManipulator {
  concatenate(str1: string, str2: string): string {
    return str1 + str2;
  }

  repeat(str: string, times: number): string {
    return str.repeat(times);
  }

  reverse(str: string): string {
    return str.split('').reverse().join('');
  }

  countVowels(str: string): number {
    return (str.match(/[aeiou]/gi) || []).length;
  }

  countConsonants(str: string): number {
    return (str.match(/[bcdfghjklmnpqrstvwxyz]/gi) || []).length;
  }

  countWords(str: string): number {
    if (!str.trim()) return 0;
    return str.trim().split(/\s+/).length;
  }

  countCharacters(str: string): number {
    return str.length;
  }
}
