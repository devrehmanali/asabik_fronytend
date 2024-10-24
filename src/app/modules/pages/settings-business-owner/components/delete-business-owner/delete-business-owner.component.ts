import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { ButtonColor } from 'src/app/shared/components/button/button-color.enum';
import { ButtonType } from 'src/app/shared/components/button/button-type.enum';
import { Icon } from 'src/app/shared/components/icon/icon.enum';
import { MatDialog } from '@angular/material/dialog';
import { DeleteBusienessOwnerModalComponent } from '../delete-busieness-owner-modal/delete-busieness-owner-modal.component';
import { Link } from 'src/app/shared/links.const';
import { Router } from '@angular/router';

@Component({
  selector: 'app-delete-business-owner',
  templateUrl: './delete-business-owner.component.html',
  styleUrls: ['./delete-business-owner.component.scss'],
})
export class DeleteBusinessOwnerComponent {
  icon = Icon;
  buttonType = ButtonType;
  buttonColor = ButtonColor;

  constructor(private dialog: MatDialog, private router: Router) {}

  openDeleteModal(): void {
    const dialogRef = this.dialog.open(DeleteBusienessOwnerModalComponent, {
      maxHeight: '100vh',
    });
  }

  navigateToPreview() {
    this.router.navigate([Link.PreviewBusinessOwnerProfile]);
  }
}
