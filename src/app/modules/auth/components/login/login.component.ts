import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { delayWhen, mergeMap } from 'rxjs';
import { LogInDto } from 'src/app/core/models/log-in.dto';
import { Session } from 'src/app/core/models/session.interface';
import { AuthService } from 'src/app/core/services/auth.service';
import { CurrentUserService } from 'src/app/core/services/current-user.service';
import { AlertType } from 'src/app/shared/components/alert/alert.enum';
import { ButtonType } from 'src/app/shared/components/button/button-type.enum';
import { InputType } from 'src/app/shared/components/input/input-type.enum';
import { Link } from 'src/app/shared/links.const';
import { Role } from 'src/app/shared/models/role.enum';
import { AlertService } from 'src/app/shared/services/alert.service';
import { ButtonColor } from 'src/app/shared/components/button/button-color.enum';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private alertService: AlertService,
    private currentUserService: CurrentUserService,
    private router: Router
  ) {}
  link = Link;
  inputType = InputType;
  buttonType = ButtonType;
  buttonColor = ButtonColor;

  form: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [
      Validators.required,
      Validators.minLength(6),
    ]),
  });

  ngOnInit(): void {}

  public login() {
    this.form.markAllAsTouched();
    this.form.updateValueAndValidity();
    if (this.form.invalid) return;

    const loginDto: LogInDto = {
      email: this.form.get('email')?.value || '',
      password: this.form.get('password')?.value || '',
    };

    this.form.disable();
    this.authService
      .signIn(loginDto)
      .pipe(
        delayWhen((session) =>
          this.currentUserService.setTempCurrentUser(session)
        )
      )
      .subscribe({
        next: (session: Session) => {
          if (session.role == Role.Admin) {
            this.router.navigate([Link.AdminPanelDashboard]);
          } else {
            this.router.navigate([Link.Dashboard]);
          }

          this.form.enable();
        },
        error: (err) => {
          console.error(err);
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
}
