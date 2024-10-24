import { Component, Inject, EventEmitter, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BusinessOwnerService } from 'src/app/shared/services/business-owner.service';
import { DecideInvestmentRequest } from 'src/app/shared/models/decide-investment-request.interface';
import { AlertService } from 'src/app/shared/services/alert.service';
import { ButtonColor } from 'src/app/shared/components/button/button-color.enum';
import { AlertType } from 'src/app/shared/components/alert/alert.enum';

@Component({
  selector: 'app-modal-manual-processing',
  templateUrl: './modal-manual-processing.component.html',
  styleUrls: ['./modal-manual-processing.component.scss'],
})
export class ModalManualProcessingComponent {
  buttonColor = ButtonColor;
  decideInvestmentRequest: DecideInvestmentRequest = {
    isApproved: false,
    investmentRequestId: 0,
  };

  businessOwnerId: number = 0;
  investmentRequestId: number = 0;

  @Output() changesSaved: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(
    private businessOwnerService: BusinessOwnerService,
    private alertService: AlertService,
    private dialogRef: MatDialogRef<ModalManualProcessingComponent>,
    @Inject(MAT_DIALOG_DATA)
    private data: { businessOwnerId: number; investmentRequestId: number }
  ) {}

  closeModal(): void {
    this.dialogRef.close();
  }

  acceptInvestmentRequest() {
    this.processInvestmentRequest(true);
  }

  declineInvestmentRequest() {
    this.processInvestmentRequest(false);
  }

  private processInvestmentRequest(isApproved: boolean) {
    this.decideInvestmentRequest.isApproved = isApproved;
    this.decideInvestmentRequest.investmentRequestId = this.investmentRequestId;

    this.businessOwnerService
      .decideInvestmentRequestForManualProcessing(
        this.data.businessOwnerId,
        this.decideInvestmentRequest
      )
      .subscribe({
        next: () => {
          this.alertService.push({
            message: 'Investment request processed successfully',
            type: AlertType.Success,
          });
          this.dialogRef.close();
          this.changesSaved.emit(true);
        },
        error: () => {
          this.alertService.push({
            message: 'Error processing investment request',
            type: AlertType.Danger,
          });
        },
      });
  }

  ngOnInit(): void {
    this.businessOwnerId = this.data.businessOwnerId;
    this.investmentRequestId = this.data.investmentRequestId;
  }
}
