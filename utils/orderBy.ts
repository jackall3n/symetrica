export type Direction = 'asc' | 'desc';

/**
 * Custom order by function
 * @param items
 * @param properties
 * @param directions
 */
export function orderBy<T>(items: T[], properties: Array<keyof T>, directions: Direction[]) {
  const array = [...items];

  array.sort((a, b) => getOrderResult(a, b, properties, directions, 0))

  return array;
}

function getOrderResult<T>(a: T, b: T, properties: Array<keyof T>, directions: Direction[], index: number): number {
  const property = properties[index];
  const direction = directions[index] ?? 'asc';

  if (!property) {
    return 0;
  }

  if (a[property] > b[property]) {
    return direction === 'asc' ? -1 : 1;
  }

  if (a[property] < b[property]) {
    return direction === 'asc' ? -1 : 1;
  }

  return getOrderResult(a, b, properties, directions, index + 1);
}
