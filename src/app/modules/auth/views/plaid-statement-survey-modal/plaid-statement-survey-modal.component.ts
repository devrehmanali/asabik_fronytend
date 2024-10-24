import { MatDialogRef } from '@angular/material/dialog';
import { Component } from '@angular/core';
import { ButtonColor } from 'src/app/shared/components/button/button-color.enum';

@Component({
  selector: 'app-plaid-statement-survey-modal',
  templateUrl: './plaid-statement-survey-modal.component.html',
  styleUrls: ['./plaid-statement-survey-modal.component.scss'],
})
export class PlaidStatementSurveyModalComponent {
  buttonColor = ButtonColor;

  constructor(
    private dialogRef: MatDialogRef<PlaidStatementSurveyModalComponent>
  ) {}

  closeModal(): void {
    this.dialogRef.close();
  }

  declineStatment(): void {
    window.location.reload();
  }
}
