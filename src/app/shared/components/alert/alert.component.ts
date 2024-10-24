import {
  Component,
  EventEmitter,
  HostBinding,
  Input,
  Output,
} from '@angular/core';
import { Icon } from '../icon/icon.enum';
import { AlertType } from './alert.enum';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
})
export class AlertComponent {
  icon = Icon;
  alertType = AlertType;
  iconType: Icon = Icon.AlertBox;

  @Input() type: AlertType = AlertType.Success;
  @Input() message: string = '';
  @Output() close: EventEmitter<void> = new EventEmitter();

  isAccepted = false;

  @HostBinding('class') get class() {
    return `alert-${this.type}`;
  }

  onClose() {
    this.close.emit();
  }

  acceptAlert() {
    this.isAccepted = true;
    setTimeout(() => {
      this.onClose();
    }, 500);
  }
}
