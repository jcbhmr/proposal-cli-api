/**
 * @module
 * @see https://github.com/WinterTC55/proposal-cli-api
 */

export const args = (() => {
  if (typeof Deno !== "undefined") {
    return Deno.args;
  }
  if (typeof Bun !== "undefined") {
    return Bun.argv.slice(2);
  }
  if (typeof process !== "undefined") {
    const hasFileArg = (() => {
      if (Array.isArray(process.execArgv)) {
        const inlineArgs = ["-e", "--eval", "-p", "--print"];
        const hasInlineArg = process.execArgv.some((arg) => inlineArgs.includes(arg));
        if (hasInlineArg) {
          return false;
        }
      }
      return true;
    })();
    return process.argv.slice(hasFileArg ? 2 : 1);
  }
  throw new DOMException("Unknown CLI environment for @jcbhmr/cli-api polyfill", "NotSupportedError");
})();

export const env = (() => {
  const envStorageBase = (() => {
    if (typeof Deno !== "undefined") {
      return {
        get length() {
          const env = Deno.env.toObject();
          return Reflect.ownKeys(env).length;
        },
        key(index) {
          const env = Deno.env.toObject();
          return Reflect.ownKeys(env)[index];
        },
        getItem(key) {
          return Deno.env.get(key);
        },
        setItem(key, value) {
          return Deno.env.set(key);
        },
        removeItem(key) {
          Deno.env.delete(key);
        },
        clear() {
          const env = Deno.env.toObject();
          for (const key of Reflect.ownKeys(env)) {
            Deno.env.delete(key);
          }
        },
      };
    }
    if (typeof Bun !== "undefined") {
      return {
        get length() {
          return Reflect.ownKeys(Bun.env).length;
        },
        key(index) {
          return Reflect.ownKeys(Bun.env)[index];
        },
        getItem(key) {
          return Bun.env[key];
        },
        setItem(key, value) {
          Bun.env[key] = value;
        },
        removeItem(key) {
          delete Bun.env[key];
        },
        clear() {
          for (const key of Reflect.ownKeys(Bun.env)) {
            delete Bun.env[key];
          }
        },
      };
    }
    if (typeof process !== "undefined") {
      return {
        get length() {
          return Reflect.ownKeys(process.env).length;
        },
        key(index) {
          return Reflect.ownKeys(process.env)[index];
        },
        getItem(key) {
          return process.env[key];
        },
        setItem(key, value) {
          process.env[key] = value;
        },
        removeItem(key) {
          delete process.env[key];
        },
        clear() {
          for (const key of Reflect.ownKeys(process.env)) {
            delete process.env[key];
          }
        },
      };
    }
    throw new DOMException("Unknown CLI environment for @jcbhmr/cli-api polyfill", "NotSupportedError");
  })();
  return new Proxy(envStorageBase, {
    get(target, property, receiver) => {
      if (property in target) {
        return target[property];
      }
      if (typeof property === "string") {
        return target.getItem(property);
      }
      return undefined;
    },
    set(target, property, value, receiver) {
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
        return target.getItem(key) !== "undefined";
      }
      return false;
    },
    deleteProperty(target, property) {
      if (property in target) {
        return Reflect.deleteProperty(target, property);
      }
      if (typeof property === "string") {
        Reflect.removeItem(property);
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
      const properties = Array.from(target, (_x, i) => target.key(i));
      return Reflect.ownKeys(target).concat(properties);
    },
  })
})();

export const exit = (() => {
  if (typeof Deno !== "undefined") {
    return Deno.exit.bind(Deno);
  }
  if (typeof Bun !== "undefined") {
    return process.exit.bind(process);
  }
  if (typeof process !== "undefined") {
    return process.exit.bind(process);
  }
  throw new DOMException("Unknown CLI environment for @jcbhmr/cli-api polyfill", "NotSupportedError");
})();
