import { MatDialogRef } from '@angular/material/dialog';
import { Component } from '@angular/core';
import { ButtonColor } from 'src/app/shared/components/button/button-color.enum';

@Component({
  selector: 'app-statement-survey-modal',
  templateUrl: './statement-survey-modal.component.html',
  styleUrls: ['./statement-survey-modal.component.scss'],
})
export class StatementSurveyModalComponent {
  buttonColor = ButtonColor;

  constructor(private dialogRef: MatDialogRef<StatementSurveyModalComponent>) {}

  closeModal(): void {
    this.dialogRef.close();
  }

  declineStatment(): void {
    window.location.reload();
  }
}
