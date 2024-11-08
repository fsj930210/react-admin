interface RaStorageOptions {
  prefix?: string;
  storageName?: 'localStorage' | 'sessionStorage';
  expiredKeyName?: string;
  [x: string]: any;
}

const defaultOptions: RaStorageOptions = {
  prefix: '',
  storageName: 'localStorage',
  expiredKeyName: '__ra_storage_expired_key__',
};

class RaStorage {
  options: RaStorageOptions = defaultOptions;
  storage: Storage;
  constructor(options?: RaStorageOptions) {
    if (!options) {
      this.options = { ...defaultOptions };
    } else {
      for (const opt in defaultOptions) {
        if (options[opt]) {
          this.options[opt] = options[opt];
        } else {
          this.options[opt] = defaultOptions[opt];
        }
      }
    }

    this.storage =
      this.options.storageName === 'localStorage'
        ? window.localStorage
        : window.sessionStorage;
  }
  config(options: RaStorageOptions) {
    for (const opt in defaultOptions) {
      if (options[opt]) {
        this.options[opt] = options[opt];
      } else {
        this.options[opt] = defaultOptions[opt];
      }
    }
  }
  setItem<T>(key: string, value: T, expires: number) {
    try {
      const { expiredKeyName, prefix } = this.options;
      const keyName = prefix + key;
      const val: { value: T } & Record<string, any> = {
        value,
      };
      if (expires > 0) {
        val[expiredKeyName as string] = new Date(Date.now() + expires * 864e5);
      }
      this.storage.setItem(keyName, JSON.stringify(val));
    } catch (error: any) {
      console.error(error);
    }
  }
  getItem<T>(key: string): T | null {
    try {
      const { expiredKeyName, prefix } = this.options;
      const keyName = prefix + key;
      const stringVal = this.storage.getItem(keyName);
      if (!stringVal) return null;
      const val = JSON.parse(stringVal);
      const expiredDate = val[expiredKeyName as string];
      if (!expiredDate) {
        return val.value;
      } else {
        const now = Date.now();
        const expiredTime = expiredDate.getTime();
        if (expiredTime - now <= 0) {
          console.error('该缓存已过期');
          this.removeItem(key);
          return null;
        } else {
          return val.value;
        }
      }
    } catch (error) {
      console.error(error);
      return null;
    }
  }
  removeItem(key: string) {
    this.storage.removeItem(key);
  }
  clear() {
    this.storage.clear();
  }
}

export default new RaStorage();
