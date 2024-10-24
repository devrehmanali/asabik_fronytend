import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { InvestmentRequestService } from 'src/app/shared/services/investment-request.service';
import { AlertType } from 'src/app/shared/components/alert/alert.enum';
import { AlertService } from 'src/app/shared/services/alert.service';
import { ButtonColor } from 'src/app/shared/components/button/button-color.enum';
import { ButtonType } from 'src/app/shared/components/button/button-type.enum';

@Component({
  selector: 'app-extend-modal-investment-request',
  templateUrl: './extend-modal-investment-request.component.html',
  styleUrls: ['./extend-modal-investment-request.component.scss'],
})
export class ExtendModalInvestmentRequestComponent {
  buttonType = ButtonType;
  buttonColor = ButtonColor;

  constructor(
    private dialogRef: MatDialogRef<ExtendModalInvestmentRequestComponent>,
    private alertService: AlertService,
    private investmentRequestService: InvestmentRequestService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  extendRaisingTime(): void {
    const investmentRequestId = this.data.investmentRequestId;

    if (investmentRequestId) {
      this.investmentRequestService
        .extendRaisingTime(investmentRequestId)
        .subscribe(
          () => {
            this.dialogRef.close('extended');
            this.alertService.push({
              message: 'Raising time extended.',
              type: AlertType.Success,
            });
            window.location.reload();
          },
          (error) => {
            this.dialogRef.close('failed');
            this.alertService.push({
              message: 'Failed to extend raising time.',
              type: AlertType.Danger,
            });
          }
        );
    }
  }

  closeModal(): void {
    this.dialogRef.close();
  }
}
