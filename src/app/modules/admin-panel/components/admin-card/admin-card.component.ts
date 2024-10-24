import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Icon } from 'src/app/shared/components/icon/icon.enum';

@Component({
  selector: 'app-admin-card',
  templateUrl: './admin-card.component.html',
  styleUrls: ['./admin-card.component.scss'],
})
export class AdminCardComponent implements OnInit, OnDestroy {
  @Input() label: string = '';
  @Input() icon: Icon = Icon.Investor;
  @Input() count: number = 0;

  ngOnInit(): void {}

  ngOnDestroy(): void {}
}
