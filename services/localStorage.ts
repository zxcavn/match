import { LOCAL_STORAGE_FIELDS, LocalStorageFieldsKeys } from '@/shared/constants/localStorageFields';

class LocalStorageBaseService {
  static get<T = string>(key: LocalStorageFieldsKeys): T | null {
    try {
      const storageValue = localStorage.getItem(key);

      return storageValue && JSON.parse(storageValue);
    } catch {
      return null;
    }
  }

  static set<T = string>(key: LocalStorageFieldsKeys, value: T): void {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('LocalStorageBaseService error:', error);
    }
  }

  static remove(key: LocalStorageFieldsKeys): void {
    localStorage.removeItem(key);
  }
}

export class LocalStorageService extends LocalStorageBaseService {
  static getAppPassword(): string {
    return super.get(LOCAL_STORAGE_FIELDS.appPassword) || '';
  }

  static setAppPassword(password: string): void {
    super.set(LOCAL_STORAGE_FIELDS.appPassword, password);
  }

  static getLocale(): string {
    return super.get(LOCAL_STORAGE_FIELDS.i18n) || '';
  }

  static setLocale(value: string): void {
    super.set(LOCAL_STORAGE_FIELDS.i18n, value);
  }
}
