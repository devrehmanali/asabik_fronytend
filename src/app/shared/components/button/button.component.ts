import { Component, Input } from '@angular/core';
import { Icon } from '../icon/icon.enum';
import { ButtonColor } from './button-color.enum';
import { ButtonType } from './button-type.enum';
import { IconPlacement } from './icon-placement.enum';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent {
  @Input() disabled: boolean = false;
  @Input() compact: boolean = false;
  @Input() type: ButtonType = ButtonType.Submit;
  @Input() color: ButtonColor = ButtonColor.Primary;
  @Input() icon?: Icon;
  @Input() iconPlacement: IconPlacement = IconPlacement.Left;
  @Input() hidden: boolean = false;
}
