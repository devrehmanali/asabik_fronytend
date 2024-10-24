import { Observable } from 'rxjs';

export interface IDataStorage {
  removeItem(key: string): Observable<void>;
  getItem(key: string): Observable<any>;
  setItem(key: string, value: any): Observable<void>;
  clear(): Observable<void>;
}
