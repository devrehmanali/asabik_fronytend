import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, mergeMap, Subscription } from 'rxjs';
import { AlertType } from 'src/app/shared/components/alert/alert.enum';
import { Link } from 'src/app/shared/links.const';
import { AlertService } from 'src/app/shared/services/alert.service';
import { UserService } from 'src/app/shared/services/user.service';
import { EmailConfirmationStatus } from './confirm-status.enum';

@Component({
  selector: 'app-confirm-email-page',
  templateUrl: './confirm-email-page.component.html',
  styleUrls: ['./confirm-email-page.component.scss'],
})
export class ConfirmEmailPageComponent implements OnInit, OnDestroy {
  link = Link;
  subs: Subscription = new Subscription();
  status: EmailConfirmationStatus = EmailConfirmationStatus.Loading;
  emailConfirmationStatus = EmailConfirmationStatus;
  userRole: string = '';
  constructor(
    private userService: UserService,
    private alertService: AlertService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.subs.add(
      this.activatedRoute.queryParams
        .pipe(
          map((params) => {
            return {
              userId: params['user'],
              token: params['token'],
            };
          }),
          mergeMap((data) =>
            this.userService.confirmEmail(data.userId, data.token)
          )
        )
        .subscribe({
          next: (response) => {
            this.userRole = response.role;
            this.status = EmailConfirmationStatus.Success;
          },
          error: (err) => {
            console.error(err);
            this.alertService.push({
              message: err.error.message
                ? err.error.message
                : 'Something went wrong',
              type: AlertType.Danger,
            });
            this.status = EmailConfirmationStatus.Error;
          },
        })
    );
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
