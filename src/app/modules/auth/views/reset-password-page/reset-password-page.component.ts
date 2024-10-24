import { Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { map, mergeMap, Subscription } from 'rxjs';
import { AlertType } from 'src/app/shared/components/alert/alert.enum';
import { InputType } from 'src/app/shared/components/input/input-type.enum';
import { Link } from 'src/app/shared/links.const';
import { AlertService } from 'src/app/shared/services/alert.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-reset-password-page',
  templateUrl: './reset-password-page.component.html',
  styleUrls: ['./reset-password-page.component.scss'],
})
export class ResetPasswordPageComponent implements OnDestroy {
  link = Link;
  subs: Subscription = new Subscription();
  inputType = InputType;

  form: FormGroup = new FormGroup({
    password: new FormControl(null, [
      Validators.required,
      Validators.minLength(6),
    ]),
  });

  constructor(
    private userService: UserService,
    private alertService: AlertService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  resetPassword(): void {
    this.subs.add(
      this.activatedRoute.queryParams
        .pipe(
          map((params) => {
            return {
              userId: params['user'] || '12',
              token: params['token'] || '123',
            };
          }),
          mergeMap((data) =>
            this.userService.resetPassword(
              data.userId,
              data.token,
              this.form.value.password
            )
          )
        )
        .subscribe({
          next: () => {
            this.alertService.push({
              message: 'Password changed successfully',
              type: AlertType.Success,
            });
            this.router.navigate([Link.LogIn]);
          },
          error: (err) => {
            this.alertService.push({
              message: 'Something went wrong',
              type: AlertType.Danger,
            });
            this.router.navigate([Link.ForgotPassword]);
          },
        })
    );
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
