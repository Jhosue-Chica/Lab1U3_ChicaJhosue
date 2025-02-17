export class ArrayManipulator {
  removeDuplicates<T>(arr: T[]): T[] {
    return [...new Set(arr)];
  }

  mostFrequent<T>(arr: T[]): T | null {
    if (arr.length === 0) return null;

    const frequency = new Map<T, number>();
    arr.forEach(item => {
      frequency.set(item, (frequency.get(item) || 0) + 1);
    });

    let maxFreq = 0;
    let result: T | null = null;

    for (const [item, freq] of frequency.entries()) {
      if (freq > maxFreq) {
        maxFreq = freq;
        result = item;
      }
    }

    return result;
  }

  rotate<T>(arr: T[], positions: number): T[] {
    if (arr.length === 0) return [];

    const normalizedPos = positions % arr.length;
    const rotationPoint = arr.length - normalizedPos;
    return [...arr.slice(rotationPoint), ...arr.slice(0, rotationPoint)];
  }

  intersection<T>(arr1: T[], arr2: T[]): T[] {
    return arr1.filter(item => arr2.includes(item));
  }

  groupBy<T>(arr: T[], keyFn: (item: T) => string): { [key: string]: T[] } {
    return arr.reduce((result, item) => {
      const key = keyFn(item);
      if (!result[key]) {
        result[key] = [];
      }
      result[key].push(item);
      return result;
    }, {} as { [key: string]: T[] });
  }

  flatten(arr: any[]): any[] {
    return arr.reduce((flat, item) => {
      return flat.concat(Array.isArray(item) ? this.flatten(item) : item);
    }, []);
  }

  uniqueElements<T>(arr1: T[], arr2: T[]): T[] {
    return [...new Set([...arr1, ...arr2])].filter(
      item => !arr1.includes(item) || !arr2.includes(item)
    );
  }
}
