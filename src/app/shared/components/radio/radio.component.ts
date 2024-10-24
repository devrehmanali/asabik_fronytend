import { Component, forwardRef, Input } from '@angular/core';
import {
  AbstractControl,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  RadioControlValueAccessor,
  ValidationErrors,
  Validator,
} from '@angular/forms';
import { Icon } from '../icon/icon.enum';

@Component({
  selector: 'app-radio',
  templateUrl: './radio.component.html',
  styleUrls: ['./radio.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RadioComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => RadioComponent),
      multi: true,
    },
  ],
})
export class RadioComponent
  extends RadioControlValueAccessor
  implements Validator
{
  @Input() icon: Icon | null = null;
  @Input() label: string = '';
  changed: boolean = false;
  selected: boolean = false;

  override registerOnChange(fn: any) {
    super.registerOnChange(fn);

    let oldOnChange = this.onChange.bind({});
    this.onChange = () => {
      oldOnChange();
      this.selected = true;
    };
  }

  override fireUncheck(value: any) {
    super.fireUncheck(value);
    this.selected = false;
  }

  override writeValue(value: any) {
    super.writeValue(value);
    this.selected = value == this.value;
  }

  validate(control: AbstractControl<any, any>): ValidationErrors | null {
    return null;
  }
}
