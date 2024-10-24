import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { StorageService } from 'src/app/shared/services/storage/storage.service';
import { Session } from '../models/session.interface';

@Injectable({
  providedIn: 'root',
})
export class CurrentUserService {
  constructor(private storage: StorageService) {}

  private tempUser: Session | null = null;

  getCurrentUser(): Observable<Session | null> {
    return this.storage.getItem<Session>('current-user').pipe(
      map((user) => {
        if (user) return user;
        return this.tempUser;
      })
    );
  }

  setTempCurrentUser(session: Session): Observable<void> {
    this.tempUser = session;
    return new Observable<void>((observer) => observer.next());
  }

  saveTempUser(): Observable<void> {
    if (this.tempUser) return this.setCurrentUser(this.tempUser);
    return new Observable<void>((observer) => observer.next());
  }

  updateTempUser(session: Partial<Session>): Observable<void> {
    this.tempUser = <Session>(
      Object.assign(this.tempUser ? this.tempUser : {}, session)
    );
    return new Observable<void>((observer) => observer.next());
  }

  setCurrentUser(session: Session): Observable<void> {
    return this.storage.setItem('current-user', session);
  }

  removeCurrentUser(): Observable<void> {
    this.tempUser = null;
    return this.storage.removeItem('current-user');
  }
}
