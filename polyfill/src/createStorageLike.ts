export interface StorageLikeBase {
  readonly length: number;
  key(index: number): string | null;
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
  removeItem(key: string): void;
  clear(): void;
}

export default function createStorageLike<T extends StorageLikeBase>(
  storageBase: T,
): T & Record<string, string> {
  return new Proxy(storageBase, {
    get(target, property, _receiver) {
      if (property in target) {
        return (target as any)[property];
      }
      if (typeof property === "string") {
        return target.getItem(property);
      }
      return undefined;
    },
    set(target, property, value, _receiver) {
      if (property in target) {
        return Reflect.set(target, property, value);
      }
      if (typeof property === "string") {
        target.setItem(property, value);
        return true;
      }
      return false;
    },
    has(target, property) {
      if (property in target) {
        return true;
      }
      if (typeof property === "string") {
        return target.getItem(property) !== "undefined";
      }
      return false;
    },
    deleteProperty(target, property) {
      if (property in target) {
        return Reflect.deleteProperty(target, property);
      }
      if (typeof property === "string") {
        target.removeItem(property);
        return true;
      }
      return false;
    },
    getOwnPropertyDescriptor(target, property) {
      if (property in target) {
        return Reflect.getOwnPropertyDescriptor(target, property);
      }
      if (typeof property === "string") {
        const value = target.getItem(property);
        if (value !== undefined) {
          return {
            configurable: true,
            enumerable: true,
            writable: true,
            value,
          };
        }
      }
      return undefined;
    },
    ownKeys(target) {
      const properties = Array.from({ length: target.length }, (_x, i) => target.key(i)!);
      return Reflect.ownKeys(target).concat(properties);
    },
  }) as T & Record<string, string>;
}
