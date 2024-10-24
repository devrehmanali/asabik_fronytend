import { MatDialogRef } from '@angular/material/dialog';
import { Component } from '@angular/core';
import { AlertType } from 'src/app/shared/components/alert/alert.enum';
import { AlertService } from 'src/app/shared/services/alert.service';
import { InvestorProfileService } from 'src/app/shared/services/investor-profile.service';
import { ButtonColor } from 'src/app/shared/components/button/button-color.enum';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-delete-investor-modal',
  templateUrl: './delete-investor-modal.component.html',
  styleUrls: ['./delete-investor-modal.component.scss'],
})
export class DeleteInvestorModalComponent {
  buttonColor = ButtonColor;

  constructor(
    private dialogRef: MatDialogRef<DeleteInvestorModalComponent>,
    private investorProfileService: InvestorProfileService,
    private alertService: AlertService,
    private authService: AuthService
  ) {}

  deleteInvestor() {
    this.investorProfileService.deleteInvestor().subscribe({
      next: () => {
        this.alertService.push({
          message: 'Profile deleted',
          type: AlertType.Success,
        });
        this.authService.logout().subscribe();
      },
      error: () => {
        this.alertService.push({
          message:
            'You cannot remove your account, due to an active investment.',
          type: AlertType.Danger,
        });
      },
    });
    this.dialogRef.close();
  }

  closeModal(): void {
    this.dialogRef.close();
  }
}
