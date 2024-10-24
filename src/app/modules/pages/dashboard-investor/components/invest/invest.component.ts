import { Component, Inject, Input, OnDestroy, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { ButtonColor } from 'src/app/shared/components/button/button-color.enum';
import { CompanyDetailsGetResponse } from 'src/app/shared/models/company-details.interace';
import { Subscription } from 'rxjs';
import { Icon } from 'src/app/shared/components/icon/icon.enum';
import { AlertService } from 'src/app/shared/services/alert.service';
import { InvestService } from 'src/app/shared/services/invest.service';
import { AlertType } from 'src/app/shared/components/alert/alert.enum';

@Component({
  selector: 'app-invest',
  templateUrl: './invest.component.html',
  styleUrls: ['./invest.component.scss'],
})
export class InvestComponent implements OnInit, OnDestroy {
  showErrorInvestContent = false;
  showInvestContent = true;
  showStateContent = false;
  showFinishInvestContent = false;
  errorText: string = '';
  increaseAmount = 500;
  icon = Icon;
  buttonColor = ButtonColor;
  loading: boolean = true;
  subs: Subscription = new Subscription();
  id?: number;
  chosenRequestId?: number;
  @Input() chosenPurposeOfTheLoan?: string;
  @Input() requiredCapital?: number;
  @Input() companyDetails!: CompanyDetailsGetResponse;
  @Input() requiredCapitalRatios: number[] = [];
  @Input() priceToInvest: number = 0;
  @Input() imgSource?: string;
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      chosenRequestId: number;
      chosenRequiredCapital: number;
      chosenRequestPurposeOfTheLoan: string;
      company: CompanyDetailsGetResponse;
    },
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<InvestComponent>,
    private investService: InvestService,
    private alertService: AlertService
  ) {}

  setPriceToInvest(value: number) {
    this.priceToInvest = value;
  }

  onPriceChange(changes: any) {
    this.priceToInvest = parseInt(changes.target.value);
  }

  backInvest() {
    this.showErrorInvestContent = false;
    this.showFinishInvestContent = false;
    this.showStateContent = false;
    this.showInvestContent = true;
  }

  stateInvest() {
    this.showStateContent = true;
    this.showInvestContent = false;
  }

  finishInvest() {
    this.showFinishInvestContent = true;
    this.showStateContent = false;
  }

  close() {
    this.dialogRef.close();
  }

  increaseValue() {
    this.priceToInvest += this.increaseAmount;
  }

  decreaseValue() {
    if (this.priceToInvest >= this.increaseAmount) {
      this.priceToInvest -= this.increaseAmount;
    }
  }

  investHandler() {
    if (this.chosenRequestId !== undefined) {
      this.loading = true;

      this.subs.add(
        this.investService
          .invest(this.chosenRequestId, this.priceToInvest)
          .subscribe({
            next: () => {
              this.loading = false;
              this.alertService.push({
                message: `You invested ${this.priceToInvest}$`,
                type: AlertType.Success,
              });
              this.dialogRef.close();
            },
            error: (err) => {
              this.errorText = err.error.message || 'Something went wrong';
              this.showErrorInvestContent = true;
              this.showFinishInvestContent = false;
            },
          })
      );
    } else {
      // Tutaj możesz obsłużyć przypadek, gdy chosenRequestId jest undefined
    }
  }

  ngOnInit(): void {
    this.id = this.data.company.id;
    this.companyDetails = this.data.company;
    this.chosenRequestId = this.data.chosenRequestId || 0;
    this.chosenPurposeOfTheLoan = this.data.chosenRequestPurposeOfTheLoan;
    this.requiredCapital = this.data.chosenRequiredCapital;
    this.imgSource =
      this.companyDetails?.imgUrl ??
      '../../../../assets/img/default-company-logo.svg';
  }

  ngOnDestroy(): void {}
}
