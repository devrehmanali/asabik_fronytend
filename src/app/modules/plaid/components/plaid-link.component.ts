import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import {
  PlaidOnEventArgs,
  PlaidOnExitArgs,
  PlaidOnSuccessArgs,
} from 'ngx-plaid-link';
import { mergeMap, Subscription } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { CurrentUserService } from 'src/app/core/services/current-user.service';
import { PlaidService } from 'src/app/core/services/plaid.service';
import { AlertType } from 'src/app/shared/components/alert/alert.enum';
import { Link } from 'src/app/shared/links.const';
import { AlertService } from 'src/app/shared/services/alert.service';
import { ButtonColor } from 'src/app/shared/components/button/button-color.enum';

@Component({
  selector: 'app-plaid-link',
  templateUrl: './plaid-link.component.html',
  styleUrls: ['./plaid-link.component.scss'],
})
export class PlaidLinkComponent implements OnInit, OnDestroy {
  public tokenFetched: boolean = false;
  public linkToken = 'public-sandbox-898c34c6-7859-46e9-aae1-1cde774a7b4a';
  buttonColor = ButtonColor;
  link = Link;

  private subs: Subscription = new Subscription();

  constructor(
    private plaidService: PlaidService,
    private currentUserService: CurrentUserService,
    private router: Router,
    private alertService: AlertService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.updateLinkToken();
  }

  enableButton() {
    this.tokenFetched = true;
  }

  disableButton() {
    this.tokenFetched = false;
  }

  onSuccess(event: PlaidOnSuccessArgs) {
    this.disableButton();
    this.subs.add(
      this.plaidService
        .createAccessToken(event.token)
        .pipe(
          mergeMap(() =>
            this.currentUserService.updateTempUser({ plaidLink: true })
          )
        )
        .subscribe({
          next: () => {
            this.router.navigate([Link.Dashboard]);
          },
          error: (err) => {
            this.alertService.push({
              message: err.error.message,
              type: AlertType.Danger,
            });
            this.updateLinkToken();
          },
        })
    );
  }

  updateLinkToken() {
    this.subs.add(
      this.plaidService.getLinkToken().subscribe({
        next: (data) => {
          this.linkToken = data.link_token;
          this.enableButton();
        },
        error: () => {
          this.alertService.push({
            message: 'Something went wrong, try again later.',
            type: AlertType.Danger,
          });
          this.subs.add(this.authService.logout().subscribe());
        },
      })
    );
  }

  onEvent(event: PlaidOnEventArgs) {
    console.log({ event });
  }

  onExit(event: PlaidOnExitArgs) {
    console.log({ error: event });
  }

  onLoad(event: any) {
    console.log({ load: event });
  }

  onClick(event: any) {
    console.log({ click: event });
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe;
  }

  logout() {
    this.authService.logout().subscribe({
      next: () => {
        this.router.navigate([Link.LogIn]);
      },
      error: (err) => {
        console.error('Error during logout:', err);
        this.router.navigate([Link.LogIn]);
      },
    });
  }
}
