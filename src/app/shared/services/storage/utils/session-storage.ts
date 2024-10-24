import { Observable, of } from 'rxjs';
import { IDataStorage } from '../models/data-storage.interface';

export class SessionStorage implements IDataStorage {
  clear(): Observable<void> {
    return of(window.sessionStorage.clear());
  }
  removeItem(key: string) {
    return of(window.sessionStorage.removeItem(key));
  }
  getItem(key: string) {
    return of(window.sessionStorage.getItem(key));
  }
  setItem(key: string, value: any) {
    return of(window.sessionStorage.setItem(key, value));
  }
}
