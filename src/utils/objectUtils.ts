export function iterateObject<T, R>(
  obj: Record<string, T>,
  callback: (key: string, item: T, index: number) => R
) {
  return Object.keys(obj).map((key, index) => callback(key, obj[key], index));
}

export function filterObject<T>(obj: Record<string, T>, callback: (item: T) => boolean) {
  return Object.keys(obj).filter(key => callback(obj[key]));
}

export function countExistentialObject<T>(obj: Record<string, T>) {
  return Object.keys(obj).filter(key => !!obj[key]).length;
}
