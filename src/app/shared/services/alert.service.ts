import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Alert } from '../models/alert.interface';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  private alertEmiter: Subject<Alert> = new Subject();

  public newAlert$: Observable<Alert> = this.alertEmiter.asObservable();

  push(alert: Alert) {
    this.alertEmiter.next(alert);
  }
}
