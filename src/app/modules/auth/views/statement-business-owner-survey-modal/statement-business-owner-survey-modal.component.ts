import { MatDialogRef } from '@angular/material/dialog';
import { Component } from '@angular/core';
import { ButtonColor } from 'src/app/shared/components/button/button-color.enum';

@Component({
  selector: 'app-statement-business-owner-survey-modal',
  templateUrl: './statement-business-owner-survey-modal.component.html',
  styleUrls: ['./statement-business-owner-survey-modal.component.scss'],
})
export class StatementBusinessOwnerSurveyModalComponent {
  buttonColor = ButtonColor;

  constructor(
    private dialogRef: MatDialogRef<StatementBusinessOwnerSurveyModalComponent>
  ) {}

  closeModal(): void {
    this.dialogRef.close();
  }

  declineStatment(): void {
    window.location.reload();
  }
}
