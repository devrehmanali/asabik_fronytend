import { Injectable } from '@angular/core';
import * as aesjs from 'aes-js';
import { EMPTY, filter, from, map, Observable } from 'rxjs';
import { IDataStorage } from './models/data-storage.interface';
import { SessionStorage } from './utils/session-storage';

@Injectable({ providedIn: 'root' })
export class StorageService {
  private privateKey = [
    11, 12, 3, 7, 8, 9, 11, 16, 4, 7, 1, 6, 15, 15, 12, 5, 16, 9, 7, 3, 1, 6, 8,
    11, 13, 12, 5, 8, 16, 1, 2, 4,
  ];

  private instance: IDataStorage = new SessionStorage();
  constructor() {}

  getItem<T>(key: any): Observable<T | null> {
    return this.instance.getItem(key).pipe(
      map((value) => {
        return this.decrypt<T>(value);
      })
    );
  }

  setItem(key: string, value: any): Observable<void> {
    const encryptedValue = value ? this.encrypt(value) : null;
    return this.instance.setItem(key, encryptedValue);
  }

  removeItem(key: string): Observable<void> {
    return this.instance.removeItem(key);
  }

  clear(): Observable<void> {
    return this.instance.clear();
  }

  private encrypt(value: any): string {
    const textBytes = aesjs.utils.utf8.toBytes(JSON.stringify(value));
    const aesCtr = new aesjs.ModeOfOperation.ctr(this.privateKey);
    return aesjs.utils.hex.fromBytes(aesCtr.encrypt(textBytes));
  }

  private decrypt<T>(value: any): T | null {
    if (!value) return null;
    const encryptedBytes = aesjs.utils.hex.toBytes(value);
    const aesCtr = new aesjs.ModeOfOperation.ctr(this.privateKey);
    const decryptedBytes = aesCtr.decrypt(encryptedBytes);
    return JSON.parse(aesjs.utils.utf8.fromBytes(decryptedBytes));
  }
}
