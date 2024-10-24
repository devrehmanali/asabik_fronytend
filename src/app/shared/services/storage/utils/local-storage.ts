import { of } from 'rxjs';
import { IDataStorage } from '../models/data-storage.interface';

export class LocalStorage implements IDataStorage {
  removeItem(key: string) {
    return of(window.localStorage.removeItem(key));
  }
  getItem(key: string) {
    return of(window.localStorage.getItem(key));
  }
  setItem(key: string, value: any) {
    return of(window.localStorage.setItem(key, value));
  }
  clear() {
    return of(window.localStorage.clear());
  }
}
