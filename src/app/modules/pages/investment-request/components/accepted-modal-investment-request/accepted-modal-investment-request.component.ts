import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ButtonColor } from 'src/app/shared/components/button/button-color.enum';
import { ButtonType } from 'src/app/shared/components/button/button-type.enum';
import { InputType } from 'src/app/shared/components/input/input-type.enum';
import { InvestmentRequestService } from 'src/app/shared/services/investment-request.service';
import { AlertService } from 'src/app/shared/services/alert.service';
import { AlertType } from 'src/app/shared/components/alert/alert.enum';

@Component({
  selector: 'app-accepted-modal-investment-request',
  templateUrl: './accepted-modal-investment-request.component.html',
  styleUrls: ['./accepted-modal-investment-request.component.scss'],
})
export class AcceptedModalInvestmentRequestComponent {
  buttonType = ButtonType;
  buttonColor = ButtonColor;
  inputType = InputType;
  messageFromBackend: string | undefined;
  requestInvestmentAdded: boolean = false;

  constructor(
    private dialogRef: MatDialogRef<AcceptedModalInvestmentRequestComponent>,
    private investmentRequestService: InvestmentRequestService,
    private alertService: AlertService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.messageFromBackend = this.data.message;
  }

  closeModal(): void {
    this.dialogRef.close();
  }

  createInvestmentRequest(): void {
    const newInvestmentRequest = {
      purposeOfTheLoan: this.data.form.get('newPurposeOfTheLoan')?.value,
      returnTerm: this.data.form.get('newReturnTerm')?.value,
      requiredCapital: this.data.form.get('newRequiredCapital')?.value,
      netReturn: this.data.form.get('newNetReturn')?.value,
      netReturnToShare: this.data.form.get('newNetReturnToShare')?.value,
      loanPurpose: this.data.form.get('newLoanPurpose')?.value,
      helpIncreaseProfit: this.data.form.get('newHelpIncreaseProfit')?.value,
      profitIncrease: this.data.form.get('newProfitIncrease')?.value,
    };

    this.investmentRequestService.create(newInvestmentRequest).subscribe(
      (response: string) => {
        console.log('Response from backend:', response);
        this.requestInvestmentAdded = true;
        this.messageFromBackend = response;
      },
      (err) => {
        this.alertService.push({
          message: err.error.message,
          type: AlertType.Danger,
        });
      }
    );
  }
}
