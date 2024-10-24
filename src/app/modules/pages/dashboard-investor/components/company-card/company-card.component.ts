import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ButtonColor } from 'src/app/shared/components/button/button-color.enum';
import { Icon } from 'src/app/shared/components/icon/icon.enum';
import { BusinessOwnerGetResponse } from 'src/app/shared/models/business-owner-get-response.interface';
import { MatDialog } from '@angular/material/dialog';
import { CompanyDetailsComponent } from '../company-details/company-details.component';
@Component({
  selector: 'app-company-card',
  templateUrl: './company-card.component.html',
  styleUrls: ['./company-card.component.scss'],
})
export class CompanyCardComponent implements OnInit, OnDestroy {
  icon = Icon;
  buttonColor = ButtonColor;
  @Input() businessOwner!: BusinessOwnerGetResponse;
  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {}

  ngOnDestroy(): void {}

  openModal(): void {
    const dialogRef = this.dialog.open(CompanyDetailsComponent, {
      data: {
        businessOwner: this.businessOwner,
        isInvested: this.businessOwner.isInvested,
      },
      maxHeight: '100vh',
    });

    dialogRef.afterClosed().subscribe(() => {
      window.location.reload();
    });
  }
}
