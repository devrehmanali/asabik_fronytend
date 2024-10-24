import { Component, OnDestroy, OnInit } from '@angular/core';
import { firstValueFrom, Subscription, timer } from 'rxjs';
import { Alert } from '../../models/alert.interface';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'app-alert-panel',
  templateUrl: './alert-panel.component.html',
  styleUrls: ['./alert-panel.component.scss'],
})
export class AlertPanelComponent implements OnInit, OnDestroy {
  alerts: Alert[] = [];
  subs: Subscription = new Subscription();

  constructor(private alertService: AlertService) {}

  ngOnInit(): void {
    this.subs.add(
      this.alertService.newAlert$.subscribe({
        next: (alert) => {
          this.push(alert);
        },
      })
    );
  }

  push(alert: Alert) {
    this.alerts.push(alert);
    // firstValueFrom(timer(3000)).then(() => this.removeAlert(alert));
  }

  removeAlert(alert: Alert) {
    this.alerts = this.alerts.filter((a) => a !== alert);
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
