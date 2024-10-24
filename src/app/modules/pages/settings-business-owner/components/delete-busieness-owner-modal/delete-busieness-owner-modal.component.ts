import { MatDialogRef } from '@angular/material/dialog';
import { Component } from '@angular/core';
import { AlertType } from 'src/app/shared/components/alert/alert.enum';
import { AlertService } from 'src/app/shared/services/alert.service';
import { BusinessOwnerProfileService } from 'src/app/shared/services/business-owner-profile.service';
import { ButtonColor } from 'src/app/shared/components/button/button-color.enum';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-delete-busieness-owner-modal',
  templateUrl: './delete-busieness-owner-modal.component.html',
  styleUrls: ['./delete-busieness-owner-modal.component.scss'],
})
export class DeleteBusienessOwnerModalComponent {
  buttonColor = ButtonColor;

  constructor(
    private dialogRef: MatDialogRef<DeleteBusienessOwnerModalComponent>,
    private businessOwnerProfileService: BusinessOwnerProfileService,
    private alertService: AlertService,
    private authService: AuthService
  ) {}

  deleteBuisnessOwner() {
    this.businessOwnerProfileService.deleteBusinessOwner().subscribe({
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
            'You cannot remove your account, due to an active investment request.',
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
