import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Subscription } from 'rxjs';
import { AlertType } from 'src/app/shared/components/alert/alert.enum';
import { Icon } from 'src/app/shared/components/icon/icon.enum';
import { Link } from 'src/app/shared/links.const';
import { InvestorDetails } from 'src/app/shared/models/investor-details.interface';
import { AlertService } from 'src/app/shared/services/alert.service';
import { InvestorService } from 'src/app/shared/services/investor.service';
import { UpdateInvestorDialogComponent } from '../../components/update-investor-dialog/update-investor-dialog.component';
import { ButtonColor } from 'src/app/shared/components/button/button-color.enum';
import { GetLoanInvestorResponse } from 'src/app/shared/models/get-loan-investor-response.interface';
import { InvestmentRequestService } from 'src/app/shared/services/investment-request.service';
import { AdminGetInvestorLoanRequest } from 'src/app/shared/models/admin-get-investor-loan-request.interface';

@Component({
  templateUrl: './investor-details-page.component.html',
  styleUrls: ['./investor-details-page.component.scss'],
})
export class InvestorDetailsPageComponent implements OnDestroy, OnInit {
  showInstallmentsDetails: boolean = false;
  currentButton: any = null;
  currentInvestmentRequestId: number | null = null;
  showTooltip = false;
  buttonColor = ButtonColor;
  mouseOverStates: Map<number, boolean> = new Map<number, boolean>();
  isMouseOver = false;
  subs: Subscription = new Subscription();
  Icon = Icon;
  Link = Link;

  onEdit: boolean = false;
  saveing: boolean = false;
  loading: boolean = false;

  dataSource = new MatTableDataSource();

  investor: InvestorDetails = {
    id: 0,
    fullName: '-',
    isActive: false,
    registrationDate: new Date(),
    email: '-',
    totalInvestments: 0,
    investments: [],
    companyName: '-',
    website: '-',
    isBlocked: false,
    extractedIdentity: {
      extractedName: '-',
      extractedPhone: '-',
      extractedEmail: '-',
      extractedAddress: {
        city: '-',
        street: '-',
        zipCode: '-',
      },
    },
  };

  displayedColumns: string[] = [
    'id',
    'companyName',
    'ownerName',
    'sector',
    'requiredInvestment',
    'alreadyInvested',
    'isActive',
    'installments',
  ];

  icon = Icon;
  iconType?: Icon;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  dataSourceInstallments = new MatTableDataSource();
  installmentsInvestmentRequest: GetLoanInvestorResponse | null = null;
  displayedColumnsInstallments: string[] = [
    'no',
    'paymentDate',
    'totalNetProfit',
    'profitToShare',
    'transfer',
  ];

  constructor(
    private alertService: AlertService,
    private investorService: InvestorService,
    private dialog: MatDialog,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private investmentRequestService: InvestmentRequestService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.pipe(map((params) => params['id'])).subscribe({
      next: (id) => {
        this.refreshInvestor(id);
      },
    });
  }

  onMouseEnter(elementId: number) {
    this.mouseOverStates.set(elementId, true);
  }

  onMouseLeave(elementId: number) {
    this.mouseOverStates.set(elementId, false);
  }

  viewInstallments(element: any) {
    if (element.investmentRequestId !== null) {
      this.currentInvestmentRequestId = element.investmentRequestId;
      this.getLastLoanForInvestor();
      element.isButtonClicked = true;
      this.showInstallmentsDetails = true;
      this.currentButton = element;
    }
  }

  getLastLoanForInvestor(): void {
    if (
      this.investor.investments &&
      this.investor.investments.length > 0 &&
      this.currentInvestmentRequestId !== null
    ) {
      const investments = this.investor.investments;
      const investorId = this.investor.id;
      const investmentRequestId = this.currentInvestmentRequestId;

      this.investmentRequestService
        .getInvestorInstallmentsForAdmin(investorId, investmentRequestId)
        .subscribe(
          (response: GetLoanInvestorResponse) => {
            if (response) {
              this.installmentsInvestmentRequest = response;
              this.dataSourceInstallments.data = response.installments;
              this.showInstallmentsDetails = true;
            } else {
              this.showInstallmentsDetails = false;
            }
          },
          (err) => {
            this.alertService.push({
              message: err.error.message,
              type: AlertType.Danger,
            });
            this.showInstallmentsDetails = false;
          }
        );
    } else {
      this.showInstallmentsDetails = false;
    }
  }

  refreshInvestor(id: number) {
    this.loading = true;
    this.investorService.getDetailsFoAdminPanel(id).subscribe({
      next: (data) => {
        this.investor = data;
        this.loading = false;
        this.dataSource.data = data.investments;
        this.investor.isBlocked = data.isBlocked;
        this.iconType = this.investor.isBlocked ? Icon.Block : Icon.Unblock;
      },
      error: () => {
        this.alertService.push({
          message: 'Something went wrong',
          type: AlertType.Danger,
        });
        this.router.navigate([Link.AdminPanelInvestorsList]);
      },
    });
  }

  blockInvestor() {
    const newIsBlockedState = !this.investor.isBlocked;
    this.investorService
      .blockOrUnblockInvestor(this.investor.id, newIsBlockedState)
      .subscribe({
        next: () => {
          this.investor.isBlocked = newIsBlockedState;
          this.iconType = newIsBlockedState ? Icon.Block : Icon.Unblock;
        },
        error: () => {
          this.alertService.push({
            message:
              'You cannot block an investor with an active investment request',
            type: AlertType.Danger,
          });
        },
      });
  }

  openUpdateDialog() {
    this.dialog
      .open(UpdateInvestorDialogComponent, { data: this.investor })
      .afterClosed()
      .subscribe((refresh) => {
        if (refresh) {
          this.refreshInvestor(this.investor.id);
        }
      });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
