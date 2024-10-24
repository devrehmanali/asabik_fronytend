import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ButtonColor } from 'src/app/shared/components/button/button-color.enum';
import { Icon } from 'src/app/shared/components/icon/icon.enum';
import { BusinessOwnerGetResponse } from 'src/app/shared/models/business-owner-get-response.interface';
import { MatDialog } from '@angular/material/dialog';
import { CompanyDetailsComponent } from '../../../dashboard-investor/components/company-details/company-details.component';
import { Router } from '@angular/router';
import { Link } from 'src/app/shared/links.const';
import { CompanyDetailsGetResponse } from 'src/app/shared/models/company-details.interace';
import { CompanyDetailsService } from 'src/app/shared/services/company-details.service';
import { AlertService } from 'src/app/shared/services/alert.service';
import { AlertType } from 'src/app/shared/components/alert/alert.enum';

@Component({
  selector: 'app-investments-card',
  templateUrl: './investments-card.component.html',
  styleUrls: ['./investments-card.component.scss'],
})
export class InvestmentsCardComponent {
  icon = Icon;
  buttonColor = ButtonColor;
  @Input() businessOwner!: BusinessOwnerGetResponse;
  businessOwners: BusinessOwnerGetResponse[] = [];
  companyDetails: CompanyDetailsGetResponse | undefined;

  constructor(
    private dialog: MatDialog,
    private router: Router,
    private companyDetailsService: CompanyDetailsService,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.companyDetailsService.getCompany(this.businessOwner.id).subscribe(
      (companyDetails: CompanyDetailsGetResponse) => {
        this.companyDetails = companyDetails;
      },
      (err) => {
        this.alertService.push({
          message: err.error.message,
          type: AlertType.Danger,
        });
      }
    );
  }

  navigateToInstallments(id: number) {
    if (id && !isNaN(id)) {
      this.router.navigate([Link.InstallmentsInvestor(id)]);
    } else {
      console.error('Wrong ID');
    }
  }

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
