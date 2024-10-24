import { Component, Inject, Input, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ButtonColor } from 'src/app/shared/components/button/button-color.enum';
import { BusinessOwnerGetResponse } from 'src/app/shared/models/business-owner-get-response.interface';
import { CompanyDetailsGetResponse } from 'src/app/shared/models/company-details.interace';
import { CompanyDetailsService } from 'src/app/shared/services/company-details.service';
import { Subscription } from 'rxjs';
import { AlertType } from 'src/app/shared/components/alert/alert.enum';
import { InvestmentRequestGetInvestorResponse } from 'src/app/shared/models/investment-request-get-investor-response.interface';
import { AlertService } from 'src/app/shared/services/alert.service';
import { InvestComponent } from '../invest/invest.component';
import { Icon } from 'src/app/shared/components/icon/icon.enum';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-company-details',
  templateUrl: './company-details.component.html',
  styleUrls: ['./company-details.component.scss'],
})
export class CompanyDetailsComponent implements OnInit, OnDestroy {
  buttonColor = ButtonColor;
  loading: boolean = true;
  subs: Subscription = new Subscription();
  id: number;
  icon = Icon;
  @Input() requestIdToInvest: number = -1;
  @Input() companyDetails!: CompanyDetailsGetResponse;
  @Input() requiredCapitalTotal: number = 0;
  chosenPurposeOfTheLoan: string = '';
  chosenRequiredCapital: number = 0;
  @Input() isInvested: boolean = false;
  showMoreDescription: boolean = false;
  showMoreRequestLoanPurpose: boolean = false;
  showMoreHelpIncreaseProfit: boolean = false;

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      businessOwner: BusinessOwnerGetResponse;
      isInvested: boolean;
    },
    private companyDetailsService: CompanyDetailsService,
    private alertService: AlertService,
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<CompanyDetailsComponent>
  ) {
    this.id = data.businessOwner.id;
    this.isInvested = data.isInvested;
  }

  ngOnInit(): void {
    this.loading = true;
    this.isInvested = this.data.isInvested;
    this.subs.add(
      this.companyDetailsService.getCompany(this.id).subscribe({
        next: (data: CompanyDetailsGetResponse) => {
          this.loading = false;
          this.companyDetails = data;
          this.companyDetails?.investmentRequests.forEach(
            (element: InvestmentRequestGetInvestorResponse) => {
              this.requiredCapitalTotal += element.requiredCapital;
            }
          );
        },
        error: (err) => {
          console.error(err);
          this.alertService.push({
            message: err.error.message
              ? err.error.message
              : 'Something went wrong',
            type: AlertType.Danger,
          });
        },
      })
    );
  }

  chooseInvestmentRequest(
    event: any,
    requestId: number,
    purposeOfTheLoan?: string,
    requiredCapital?: number
  ) {
    if (event.target.checked) {
      this.requestIdToInvest = requestId;
      this.chosenPurposeOfTheLoan = purposeOfTheLoan!;
      this.chosenRequiredCapital = requiredCapital!;
    } else {
      this.requestIdToInvest = -1;
      this.chosenPurposeOfTheLoan = '';
      this.chosenRequiredCapital = 0;
    }
  }

  investHandler() {
    this.dialog.open(InvestComponent, {
      data: {
        chosenRequestId: this.requestIdToInvest,
        chosenRequestPurposeOfTheLoan: this.chosenPurposeOfTheLoan,
        chosenRequiredCapital: this.chosenRequiredCapital,
        company: this.companyDetails,
      },
      maxHeight: '100vh',
    });
  }

  locationHandler() {
    navigator.clipboard.writeText(
      `${this.companyDetails.city}, ${this.companyDetails.street}`
    );
    const copiedMesage = document.getElementById('addressCopied');
    if (copiedMesage) {
      copiedMesage!.style.display = 'block';
      setTimeout(() => (copiedMesage!.style.display = 'none'), 2000);
    }
  }

  phoneHandler() {
    navigator.clipboard.writeText(this.companyDetails.phone!);
    const copiedMesage = document.getElementById('phoneCopied');
    if (copiedMesage) {
      copiedMesage!.style.display = 'block';
      setTimeout(() => (copiedMesage!.style.display = 'none'), 2000);
    }
  }

  websiteHandler() {
    const newTab = window.open(
      `https://${this.companyDetails.website}`,
      '_blank'
    );
    if (newTab) {
      newTab.focus();
    }
  }

  toggleShowMoreDescription() {
    this.showMoreDescription = !this.showMoreDescription;
  }

  toggleShowMoreLoanPurpose() {
    this.showMoreRequestLoanPurpose = !this.showMoreRequestLoanPurpose;
  }

  toggleShowMoreHelpIncreaseProfit() {
    this.showMoreHelpIncreaseProfit = !this.showMoreHelpIncreaseProfit;
  }

  closeDialog() {
    this.dialogRef.close();
    window.location.reload();
  }
  ngOnDestroy(): void {}
}
