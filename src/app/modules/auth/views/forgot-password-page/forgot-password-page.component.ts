import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertType } from 'src/app/shared/components/alert/alert.enum';
import { Link } from 'src/app/shared/links.const';
import { AlertService } from 'src/app/shared/services/alert.service';
import { UserService } from 'src/app/shared/services/user.service';
import { ButtonColor } from 'src/app/shared/components/button/button-color.enum';

@Component({
  selector: 'app-forgot-password-page',
  templateUrl: './forgot-password-page.component.html',
  styleUrls: ['./forgot-password-page.component.scss'],
})
export class ForgotPasswordPageComponent {
  link = Link;
  buttonColor = ButtonColor;

  form: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
  });

  constructor(
    private userService: UserService,
    private alertService: AlertService,
    private router: Router
  ) {}

  sendResetLink(): void {
    const email = this.form.value.email;
    this.form.reset();
    this.form.markAsUntouched();
    this.userService.sendResetPasswordEmail(email).subscribe({
      next: () => {
        this.alertService.push({
          message: 'Email has been sent',
          type: AlertType.Success,
        });
        this.router.navigate([Link.LogIn]);
      },
      error: () => {
        this.alertService.push({
          message: 'Email has been sent',
          type: AlertType.Success,
        });
        this.router.navigate([Link.LogIn]);
      },
    });
  }
}
