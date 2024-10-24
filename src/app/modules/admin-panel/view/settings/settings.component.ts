import { Component, OnDestroy, OnInit } from '@angular/core';
import { Icon } from 'src/app/shared/components/icon/icon.enum';
import { ButtonColor } from 'src/app/shared/components/button/button-color.enum';
import { SettingsService } from 'src/app/shared/services/settings.service';
import { GlobalSettingsResponse } from 'src/app/shared/models/global-settings-response-interface';
import { Subscription, mergeMap } from 'rxjs';
import { AlertService } from 'src/app/shared/services/alert.service';
import { AlertType } from 'src/app/shared/components/alert/alert.enum';
import { PlaidService } from 'src/app/core/services/plaid.service';
import {
  PlaidOnEventArgs,
  PlaidOnExitArgs,
  PlaidOnSuccessArgs,
} from 'ngx-plaid-link';
import { Link } from 'src/app/shared/links.const';
import { Router } from '@angular/router';
import { CurrentUserService } from 'src/app/core/services/current-user.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnDestroy, OnInit {
  link = Link;
  public tokenFetched: boolean = false;
  public linkToken = 'access-sandbox-888faa7b-42d6-4c5d-964a-465de82efc5f';
  icon = Icon;
  buttonColor = ButtonColor;
  private subs: Subscription = new Subscription();
  public ButtonColor = ButtonColor;
  public Icon = Icon;
  public r: number = 0;
  public m: number = 0;
  public a: number = 0;
  public raisingTimeLimit: number = 0;
  public maxReturnTermWOManualProcessing: number = 0;
  public minLoan: number = 0;
  public maxLoan: number = 0;
  public invalidTransactionPenalty: number = 0;
  public plaidTokenPenalty: number = 0;
  public applicationFee: number = 0;
  public loading: boolean = false;

  public currentButtonColor: ButtonColor = ButtonColor.Secondary;
  public currentIcon: Icon = Icon.Save;

  constructor(
    private plaidService: PlaidService,
    private settingsService: SettingsService,
    private alertService: AlertService,
    private router: Router,
    private currentUserService: CurrentUserService
  ) {}

  onSuccess(event: PlaidOnSuccessArgs) {
    this.disableButton();
    this.subs.add(
      this.plaidService
        .setAdminsAccessToken(event.token)
        .pipe(
          mergeMap(() =>
            this.currentUserService.updateTempUser({ plaidLink: true })
          )
        )
        .subscribe({
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
      this.plaidService.getAdminLinkToken().subscribe({
        next: (data) => {
          this.linkToken = data.link_token;
          this.enableButton();
        },
        error: (err) => {
          if (
            err.error.message !==
            'Your account is already connected with Plaid.'
          ) {
            this.alertService.push({
              message: err.error.message,
              type: AlertType.Danger,
            });
          }
        },
      })
    );
  }

  enableButton() {
    this.tokenFetched = true;
  }

  disableButton() {
    this.tokenFetched = false;
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

  ngOnInit(): void {
    this.loadGlobalSettings();
    this.updateLinkToken();
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  incrementValue(fieldName: string) {
    if (fieldName === 'raisingTimeLimit') {
      this.raisingTimeLimit += 1;
    } else if (fieldName === 'maxReturnTermWOManualProcessing') {
      this.maxReturnTermWOManualProcessing += 1;
    } else if (fieldName === 'minLoan') {
      this.minLoan += 10;
    } else if (fieldName === 'maxLoan') {
      this.maxLoan += 10;
    } else if (fieldName === 'invalidTransactionPenalty') {
      this.invalidTransactionPenalty += 1;
    } else if (fieldName === 'plaidTokenPenalty') {
      this.plaidTokenPenalty += 10;
    } else if (fieldName === 'applicationFee') {
      this.applicationFee += 1;
    }
  }

  decrementValue(fieldName: string) {
    if (fieldName === 'raisingTimeLimit' && this.raisingTimeLimit > 0) {
      this.raisingTimeLimit -= 1;
    } else if (
      fieldName === 'maxReturnTermWOManualProcessing' &&
      this.maxReturnTermWOManualProcessing > 0
    ) {
      this.maxReturnTermWOManualProcessing -= 1;
    } else if (fieldName === 'minLoan' && this.minLoan > 0) {
      this.minLoan -= 10;
    } else if (fieldName === 'maxLoan' && this.maxLoan > 0) {
      this.maxLoan -= 10;
    } else if (
      fieldName === 'invalidTransactionPenalty' &&
      this.invalidTransactionPenalty > 0
    ) {
      this.invalidTransactionPenalty -= 1;
    } else if (
      fieldName === 'plaidTokenPenalty' &&
      this.plaidTokenPenalty > 0
    ) {
      this.plaidTokenPenalty -= 10;
    } else if (fieldName === 'applicationFee' && this.applicationFee > 0) {
      this.applicationFee -= 1;
    }
  }

  private loadGlobalSettings(): void {
    this.loading = true;
    this.subs.add(
      this.settingsService.getGlobalSettings().subscribe((data) => {
        this.loading = false;
        this.r = data.r;
        this.m = data.m;
        this.a = data.a;
        this.raisingTimeLimit = data.raisingTimeLimit;
        this.maxReturnTermWOManualProcessing =
          data.maxReturnTermWOManualProcessing;
        this.minLoan = data.minLoan;
        this.maxLoan = data.maxLoan;
        this.invalidTransactionPenalty = data.invalidTransactionPenalty;
        this.plaidTokenPenalty = data.plaidTokenPenalty;
        this.applicationFee = data.applicationFee;
      })
    );
  }

  onSave(): void {
    if (Number.isNaN(this.r)) {
      this.alertService.push({
        message: 'Value for "Current R" must be a number',
        type: AlertType.Danger,
      });
      return;
    }

    if (Number.isNaN(this.m)) {
      this.alertService.push({
        message: 'Value for "Current M" must be a number',
        type: AlertType.Danger,
      });
      return;
    }

    if (Number.isNaN(this.a)) {
      this.alertService.push({
        message: 'Value for "Current A" must be a number',
        type: AlertType.Danger,
      });
      return;
    }

    if (!Number.isInteger(this.raisingTimeLimit) || this.raisingTimeLimit < 0) {
      this.alertService.push({
        message:
          'Value for "Current Investment Raising time limit" must be a positive integer',
        type: AlertType.Danger,
      });
      return;
    }

    if (
      !Number.isInteger(this.maxReturnTermWOManualProcessing) ||
      this.maxReturnTermWOManualProcessing < 0
    ) {
      this.alertService.push({
        message:
          'Value for "Current Investment Raising time limit" must be a positive integer',
        type: AlertType.Danger,
      });
      return;
    }

    if (!Number.isInteger(this.minLoan) || this.minLoan < 0) {
      this.alertService.push({
        message: 'Value for "Min Loan Range" must be a positive integer',
        type: AlertType.Danger,
      });
      return;
    }

    if (!Number.isInteger(this.maxLoan) || this.maxLoan < 0) {
      this.alertService.push({
        message: 'Value for "Max Loan Range" must be a positive integer',
        type: AlertType.Danger,
      });
      return;
    }

    if (this.maxReturnTermWOManualProcessing > 5) {
      this.alertService.push({
        message: 'Maximum Automatic Loan Term must be less than or equal to 5',
        type: AlertType.Danger,
      });
      return;
    }

    if (
      !Number.isInteger(this.invalidTransactionPenalty) ||
      this.invalidTransactionPenalty < 0
    ) {
      this.alertService.push({
        message:
          'Value for "Invalid Transaction Penalty" must be a positive integer',
        type: AlertType.Danger,
      });
      return;
    }

    if (
      !Number.isInteger(this.plaidTokenPenalty) ||
      this.plaidTokenPenalty < 0
    ) {
      this.alertService.push({
        message: 'Value for "Plaid Token Penalty" must be a positive integer',
        type: AlertType.Danger,
      });
      return;
    }

    const updateGlobalSetting: GlobalSettingsResponse = {
      r: parseFloat(this.r.toString()),
      m: parseFloat(this.m.toString()),
      a: parseFloat(this.a.toString()),
      raisingTimeLimit: this.raisingTimeLimit,
      maxReturnTermWOManualProcessing: this.maxReturnTermWOManualProcessing,
      minLoan: this.minLoan,
      maxLoan: this.maxLoan,
      invalidTransactionPenalty: this.invalidTransactionPenalty,
      plaidTokenPenalty: this.plaidTokenPenalty,
      applicationFee: this.applicationFee,
    };

    this.subs.add(
      this.settingsService.updateGlobalSettings(updateGlobalSetting).subscribe({
        next: () => {
          this.alertService.push({
            message: 'Settings updated successfully!',
            type: AlertType.Success,
          });
          this.currentButtonColor = ButtonColor.Success;
          this.currentIcon = Icon.Ok;
        },
        error: (error) => {
          console.error('Error while updating settings:', error);
        },
      })
    );
  }
}
