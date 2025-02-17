export class ArrayManipulator {
  // Elimina duplicados de un array
  removeDuplicates<T>(array: T[]): T[] {
    return [...new Set(array)];
  }

  // Busca el elemento más frecuente
  mostFrequent<T>(array: T[]): T | null {
    if (array.length === 0) return null;

    const frequency = array.reduce((acc, val) => {
      acc[val as any] = (acc[val as any] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(frequency).reduce((a, b) =>
      frequency[a as any] > frequency[b[0]] ? a : b[0]
    , Object.keys(frequency)[0]) as T;
  }

  // Rota un array n posiciones
  rotate<T>(array: T[], positions: number): T[] {
    if (array.length === 0) return [];
    const pos = positions % array.length;
    return [...array.slice(pos), ...array.slice(0, pos)];
  }

  // Encuentra la intersección entre dos arrays
  intersection<T>(array1: T[], array2: T[]): T[] {
    return array1.filter(item => array2.includes(item));
  }

  // Agrupa elementos por un criterio
  groupBy<T>(array: T[], criteria: (item: T) => string): Record<string, T[]> {
    return array.reduce((acc, item) => {
      const key = criteria(item);
      acc[key] = acc[key] || [];
      acc[key].push(item);
      return acc;
    }, {} as Record<string, T[]>);
  }

  // Aplana un array multidimensional
  flatten(array: any[]): any[] {
    return array.reduce((flat, toFlatten) => {
      return flat.concat(Array.isArray(toFlatten) ? this.flatten(toFlatten) : toFlatten);
    }, []);
  }

  // Encuentra elementos únicos entre dos arrays
  uniqueElements<T>(array1: T[], array2: T[]): T[] {
    const combined = [...array1, ...array2];
    return combined.filter(item =>
      array1.includes(item) !== array2.includes(item)
    );
  }
}
