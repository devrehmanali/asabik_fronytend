import {
  Component,
  ElementRef,
  forwardRef,
  HostBinding,
  Input,
  OnInit,
  Renderer2,
} from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  DefaultValueAccessor,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validator,
} from '@angular/forms';
import { InputType } from './input-type.enum';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => InputComponent),
      multi: true,
    },
  ],
})
export class InputComponent
  extends DefaultValueAccessor
  implements Validator, OnInit
{
  inputType = InputType;
  @Input() placeholder: string = '';
  @Input() label: string = '';
  @Input() prefix: string = '';
  @Input() type: InputType = InputType.Text;
  _readonly: boolean = false;
  @Input() set readonly(state: boolean) {
    this.setReadonlydState(state);
    this._readonly = state;
  }
  get readonly(): boolean {
    return this._readonly;
  }
  @HostBinding('class') get class() {
    return this.focus ? 'ng-focus' : '';
  }
  innerValue: string = '';
  @Input() disabled: boolean = false;
  focus: boolean = false;
  touched: boolean = false;
  validationErrors: ValidationErrors | null = null;

  get value(): string {
    return this.innerValue;
  }
  set value(newValue: string) {
    if (newValue !== this.innerValue) {
      this.innerValue = newValue;
      this.onChangeCallback(newValue);
      this.onTouchedCallback();
    }
  }

  constructor(private renderer: Renderer2, private elementRef: ElementRef) {
    super(renderer, elementRef, false);
  }

  ngOnInit(): void {
    this.setDisabledState(this.disabled);
    this.setReadonlydState(this.readonly);
  }

  onChangeCallback: (value: string) => void = () => {};
  onTouchedCallback: () => void = () => {};

  override writeValue(newValue: any): void {
    this.value = newValue;
  }
  override registerOnChange(fn: any): void {
    this.onChangeCallback = fn;
  }
  override registerOnTouched(fn: any): void {
    this.onTouchedCallback = () => {
      this.touched = true;
      fn();
    };
  }

  override setDisabledState(isDisabled: boolean): void {
    this.renderer.setAttribute(
      this.elementRef.nativeElement,
      'disabled',
      isDisabled ? 'true' : 'false'
    );
  }

  setReadonlydState(state: boolean): void {
    this.renderer.setAttribute(
      this.elementRef.nativeElement,
      'readonly',
      state ? 'true' : 'false'
    );
  }

  validate(control: AbstractControl<any, any>): ValidationErrors | null {
    setTimeout(() => {
      this.validationErrors = control.errors;
    }, 10);
    return null;
  }

  onFocusIn() {
    this.focus = true;
    this.onTouchedCallback();
  }
  onFocusOut() {
    this.focus = false;
  }
}
