import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertType } from 'src/app/shared/components/alert/alert.enum';
import { ButtonType } from 'src/app/shared/components/button/button-type.enum';
import { Icon } from 'src/app/shared/components/icon/icon.enum';
import { InputType } from 'src/app/shared/components/input/input-type.enum';
import { Link } from 'src/app/shared/links.const';
import { CreateUserDto } from 'src/app/shared/models/create-user.dto';
import { Role } from 'src/app/shared/models/role.enum';
import { AlertService } from 'src/app/shared/services/alert.service';
import { UserService } from 'src/app/shared/services/user.service';
import { SignUpStep } from './sign-up-step.enum';
import { ButtonColor } from 'src/app/shared/components/button/button-color.enum';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  constructor(
    private userService: UserService,
    private alertService: AlertService,
    private router: Router
  ) {}
  link = Link;
  inputType = InputType;
  role = Role;
  icon = Icon;
  step: SignUpStep = SignUpStep.SignUp;
  signUpStep = SignUpStep;
  buttonType = ButtonType;
  buttonDisabled: boolean = true;
  iconType: Icon = Icon.CheckBox;
  isButtonDisabled: boolean = true;
  buttonColor = ButtonColor;

  hasMinLength: boolean = false;
  hasLettersAndNumbers: boolean = false;
  hasCapitalLetter: boolean = false;
  hasSpecialCharacter: boolean = false;

  form: FormGroup = new FormGroup({
    role: new FormControl(Role.Investor, [Validators.required]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [
      Validators.required,
      Validators.minLength(6),
    ]),
  });

  ngOnInit(): void {
    this.form.get('password')?.valueChanges.subscribe((password) => {
      this.hasMinLength = password.length >= 8;
      this.hasLettersAndNumbers =
        /[a-zA-Z]/.test(password) && /\d/.test(password);
      this.hasCapitalLetter = /[A-Z]/.test(password);
      this.hasSpecialCharacter = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\]/.test(
        password
      );
    });
  }

  public signUp() {
    this.form.markAllAsTouched();
    this.form.updateValueAndValidity();

    this.hasMinLength = this.form.get('password')?.value.length >= 8;
    this.hasLettersAndNumbers =
      /[a-zA-Z]/.test(this.form.get('password')?.value) &&
      /\d/.test(this.form.get('password')?.value);
    this.hasCapitalLetter = /[A-Z]/.test(this.form.get('password')?.value);
    this.hasSpecialCharacter = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\]/.test(
      this.form.get('password')?.value
    );

    if (this.form.invalid) return;

    const createUserDto: CreateUserDto = {
      role: this.form.get('role')?.value || '',
      email: this.form.get('email')?.value || '',
      password: this.form.get('password')?.value || '',
    };

    this.form.disable();
    this.userService.create(createUserDto).subscribe({
      next: () => {
        this.alertService.push({
          message:
            'You have successfully created an account! Please confirm your email...',
          type: AlertType.Success,
        });
        this.router.navigate([Link.LogIn]);
      },
      error: (err) => {
        this.alertService.push({
          message: err.error.message
            ? err.error.message
            : 'Something went wrong',
          type: AlertType.Danger,
        });
        this.form.enable();
      },
    });
  }

  toggleIconType() {
    if (this.iconType === Icon.Check) {
      this.iconType = Icon.CheckBox;
    } else {
      this.iconType = Icon.Check;
    }
  }

  get checkContainerClass(): string {
    return this.iconType === Icon.Check
      ? 'check-container-green'
      : 'check-container-gray';
  }
}
