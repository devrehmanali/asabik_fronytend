import {
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
  Renderer2,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import * as saveAs from 'file-saver';
import { map, Subscription } from 'rxjs';
import { AlertType } from 'src/app/shared/components/alert/alert.enum';
import { ButtonColor } from 'src/app/shared/components/button/button-color.enum';
import { Icon } from 'src/app/shared/components/icon/icon.enum';
import { Link } from 'src/app/shared/links.const';
import { AlertService } from 'src/app/shared/services/alert.service';
import { BusinessOwnerService } from 'src/app/shared/services/business-owner.service';
import { MonthlyReport } from '../../../../shared/models/monthly-report.interface';
import { UpdateBusinessOwnerDialogComponent } from '../../components/update-business-owner-dialog/update-business-owner-dialog.component';
import { BusinessOwnerGetDetailedAdminResponse } from 'src/app/shared/models/business-owner-get-detailed-admin-response.interface';
import { InvestmentRequestGetAdminResponse } from 'src/app/shared/models/investment-request-get-admin-response.interface';
import { ModalManualProcessingComponent } from '../modal-manual-processing/modal-manual-processing.component';
import * as jsPDF from 'jspdf';
import { BusinessOwnerSurveyAnswers } from 'src/app/shared/models/business.owner.survey.answers.interface';
import { InvestmentRequestService } from 'src/app/shared/services/investment-request.service';
import { CreditRatingDataResponse } from 'src/app/shared/models/credit-rating-data-response.interface';
import { MonthlyReportAdminResponse } from 'src/app/shared/models/monthly-report-admin-response.interface';
import { DecideMonthlyReport } from 'src/app/shared/models/decide-monthly-report.interface';
import { GetLoanBusinessOwnerResponse } from 'src/app/shared/models/get-loan-business-owner-response.interface';
import { NewestMonthlyReportAdminResponse } from 'src/app/shared/models/newest-monthly-report-admin-response.interface';
import { IdentityScoreAdminResponse } from 'src/app/shared/models/identity-score-admin-response.interface';

@Component({
  templateUrl: './business-owner-details-page.component.html',
  styleUrls: ['./business-owner-details-page.component.scss'],
})
export class BusinessOwnerDetailsPageComponent implements OnDestroy, OnInit {
  identityScore: IdentityScoreAdminResponse | null = null;
  selectedInvestmentRequestId: number | null = null;
  showInstallmentsDetails: boolean = false;
  showTooltip = false;
  buttonColor = ButtonColor;
  mouseOverStates: Map<number, boolean> = new Map<number, boolean>();
  isMouseOver = false;
  subs: Subscription = new Subscription();
  Icon = Icon;
  ButtonColor = ButtonColor;
  Link = Link;
  monthlyReportForAdmin: MonthlyReportAdminResponse | null = null;
  newestMonthlyReportForAdmin: NewestMonthlyReportAdminResponse | null = null;
  showMoreInflowDescription: boolean = false;
  showMoreOutflowDescription: boolean = false;
  inflowDescription: string | null = null;
  outflowDescription: string | null = null;

  onEdit: boolean = false;
  saveing: boolean = false;
  loading: boolean = false;
  downloading: boolean = false;

  businessOwner: BusinessOwnerGetDetailedAdminResponse = {
    id: 0,
    companyName: '-',
    registrationDate: new Date(),
    ownerName: '-',
    sector: '-',
    address: {
      city: '-',
      street: '-',
      zipCode: '-',
      state: '-',
    },
    receivedInvestments: 0,
    requiredInvestments: 0,
    phoneNumber: '-',
    email: '-',
    isActive: false,
    isBlocked: false,
    isReportAvailable: false,
    investors: [],
    investmentRequests: [],
  };

  displayedColumns: string[] = [
    'id',
    'companyName',
    'name',
    'alreadyInvested',
    'isActive',
  ];

  displayedColumnsRequests: string[] = [
    'id',
    'creditRating',
    'loanPurpose',
    'helpIncreaseProfit',
    'requiredCapital',
    'returnTerm',
    'rating',
    'ratingUpdate',
    'dti',
    'status',
    'installments',
  ];

  dataSourceRequests =
    new MatTableDataSource<InvestmentRequestGetAdminResponse>();
  dataSource = new MatTableDataSource();

  investmentRequests: InvestmentRequestGetAdminResponse[] = [];

  icon = Icon;
  iconType?: Icon;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  dataSourceInstallments = new MatTableDataSource();
  installmentsInvestmentRequest: GetLoanBusinessOwnerResponse | null = null;
  displayedColumnsInstallments: string[] = [
    'no',
    'paymentDate',
    'totalRevenue',
    'totalNetProfit',
    'profitToShare',
    'transfer',
  ];

  constructor(
    private businessOwnerService: BusinessOwnerService,
    private investmentRequestService: InvestmentRequestService,
    private dialog: MatDialog,
    private alertService: AlertService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private renderer: Renderer2
  ) {}

  uploadMonthlyReports(event: any) {
    const file = event.target.files[0];
    if (file) {
      const businessOwnerId = this.businessOwner.id;
      this.businessOwnerService.uploadReports(businessOwnerId, file).subscribe(
        () => {
          this.alertService.push({
            message: 'Monthly reports uploaded successfully',
            type: AlertType.Success,
          });
        },
        (error) => {
          console.log(error);
          this.alertService.push({
            message: error.error.message,
            type: AlertType.Danger,
          });
        }
      );
    }
  }

  viewInstallments(investmentRequest: InvestmentRequestGetAdminResponse) {
    const investmentRequestId = investmentRequest.id;
    const businessOwnerId = this.businessOwner.id;

    this.getLastLoanForBusinessOwner(businessOwnerId, investmentRequestId);

    this.selectedInvestmentRequestId = investmentRequestId;
    this.showInstallmentsDetails = true;
  }

  getLastLoanForBusinessOwner(
    businessOwnerId: number,
    investmentRequestId: number
  ): void {
    if (investmentRequestId !== null) {
      this.investmentRequestService
        .getBusinessOwnersInstallmentsForAdmin(
          businessOwnerId,
          investmentRequestId
        )
        .subscribe(
          (response: GetLoanBusinessOwnerResponse) => {
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
    }
  }

  ngOnInit(): void {
    this.activatedRoute.params.pipe(map((params) => params['id'])).subscribe({
      next: (id) => {
        this.refreshBusinessOwner(id);
        this.getInvestmentRequests(id);

        this.businessOwnerService.getBusinessOwnersMonthlyReport(id).subscribe(
          (data) => {
            if (this.businessOwner?.isReportAvailable) {
              this.monthlyReportForAdmin = data;
              this.inflowDescription =
                this.monthlyReportForAdmin?.monthlyReportUpdate
                  ?.inflowDescription || '';
              this.outflowDescription =
                this.monthlyReportForAdmin?.monthlyReportUpdate
                  ?.outflowDescription || '';
            }
          },
          (err) => {
            if (this.businessOwner?.isReportAvailable) {
              this.alertService.push({
                message: err.error.message,
                type: AlertType.Danger,
              });
            }
          }
        );

        this.businessOwnerService
          .getBusinessOwnersNewestMonthlyReport(id)
          .subscribe(
            (data) => {
              this.newestMonthlyReportForAdmin = data;
              this.inflowDescription =
                this.newestMonthlyReportForAdmin?.inflowDescription || '';
              this.outflowDescription =
                this.newestMonthlyReportForAdmin?.outflowDescription || '';
            },
            (err) => {
              if (this.businessOwner?.isReportAvailable) {
                this.alertService.push({
                  message: err.error.message,
                  type: AlertType.Danger,
                });
              }
            }
          );
        this.businessOwnerService.getBusinessOwnersIdentityScore(id).subscribe(
          (identityScore) => {
            this.identityScore = identityScore;
          },
          (err) => {
            this.alertService.push({
              message: err.error.message,
              type: AlertType.Danger,
            });
          }
        );
      },
    });
  }

  onMouseEnter(elementId: number) {
    this.mouseOverStates.set(elementId, true);
  }

  onMouseLeave(elementId: number) {
    this.mouseOverStates.set(elementId, false);
  }

  acceptMonthlyReport() {
    const decideMonthlyReport: DecideMonthlyReport = {
      monthlyReportId: this.monthlyReportForAdmin?.monthlyReportId || 0,
      isApproved: true,
    };

    this.businessOwnerService
      .decideMonthlyReportUpdate(this.businessOwner.id, decideMonthlyReport)
      .subscribe(
        () => {
          this.alertService.push({
            message: 'Positively accepted Monthly Reports',
            type: AlertType.Success,
          });
        },
        (err) => {
          this.alertService.push({
            message: err.error.message,
            type: AlertType.Danger,
          });
        }
      );
  }

  declineMonthlyReport() {
    const decideMonthlyReport: DecideMonthlyReport = {
      monthlyReportId: this.monthlyReportForAdmin?.monthlyReportId || 0,
      isApproved: false,
    };

    this.businessOwnerService
      .decideMonthlyReportUpdate(this.businessOwner.id, decideMonthlyReport)
      .subscribe(
        () => {
          this.alertService.push({
            message: 'Positively rejected Monthly Reports',
            type: AlertType.Success,
          });
        },
        (err) => {
          this.alertService.push({
            message: err.error.message,
            type: AlertType.Danger,
          });
        }
      );
  }

  async downloadCsv() {
    this.downloading = true;
    this.businessOwnerService
      .getBusinessOwnerMonthlyReports(this.businessOwner.id)
      .pipe(
        map((data: MonthlyReport[]) => {
          const columns: string[] = [
            'inflow',
            'outflow',
            'vInflow',
            'vTotal',
            'outflowExceed',
            'isNegativeBalance',
          ];
          let csv = columns.join(';') + '\n';
          data.forEach((report: any) => {
            columns.forEach((column, i) => {
              if (i == 0) {
                csv += report[column];
              } else {
                csv += ';' + report[column];
              }
            });
            csv += '\n';
          });
          return csv;
        })
      )
      .subscribe({
        next: (csv) => {
          this.downloading = false;
          const blob = new Blob([csv], {
            type: 'text/plain;charset=utf-8',
          });
          saveAs(blob, `business-owner-${this.businessOwner.id}-report.csv`);
        },
        error: () => {
          this.downloading = false;
          this.alertService.push({
            message: 'Something went wrong',
            type: AlertType.Danger,
          });
        },
      });
  }

  downloadPdf() {
    this.businessOwnerService
      .getSurveyAnswersPdf(this.businessOwner.id)
      .subscribe({
        next: (surveyData: BusinessOwnerSurveyAnswers) => {
          try {
            const pdf = new jsPDF.default();
            const margin = 10;
            let currentPage = 1;
            let yPosition = margin;

            const imgSrc = '/assets/img/asabik-logo.jpg';
            pdf.addImage(imgSrc, 'JPEG', 65, 10, 80, 0);

            pdf
              .text('Business Owners Survey Answers Report', 50, 45)
              .setFontSize(13);
            pdf.text('Business owners id: ', 20, 70);
            pdf.text(String(surveyData.id) || '-', 20, 80);

            pdf.text('When did you start doing business?: ', 20, 100);
            if (surveyData.surveyValidations?.isStartDateValid === true) {
              pdf.setTextColor(255, 0, 0);
            }
            pdf.text(String(surveyData.startDate) || '-', 20, 110);
            pdf.setTextColor(0);

            pdf.text('What is the purpose of the loan? ', 20, 130);
            if (surveyData.surveyValidations?.isLoanPurposeValid === true) {
              pdf.setTextColor(255, 0, 0);
            }
            pdf.text(surveyData.loanPurpose || '-', 20, 140);
            pdf.setTextColor(0);

            pdf.text(
              'What industry describes your main business activity? ',
              20,
              160
            );
            pdf.text(String(surveyData.business) || '-', 20, 170);

            pdf.text(
              'What industry describes your main business activity? ',
              20,
              190
            );
            pdf.text(String(surveyData.businessSector) || '-', 20, 200);

            pdf.text('What is your main product or service? ', 20, 220);
            if (
              surveyData.surveyValidations?.isBusinessSubsectorValid === true
            ) {
              pdf.setTextColor(255, 0, 0);
            }
            pdf.text(String(surveyData.businessSubsector) || '-', 20, 230);
            pdf.setTextColor(0);

            pdf.text('Describe your business: ', 20, 250);
            pdf.text(String(surveyData.businessStructure) || '-', 20, 260);

            pdf.text('What is your average monthly sales? ', 20, 280);
            pdf.text(String(surveyData.avrMonthlySales) || '-', 20, 290);

            pdf.addPage();
            currentPage++;
            yPosition = margin;

            pdf.text('What is your average monthly net profit? ', 20, 20);
            pdf.text(String(surveyData.avrMonthlyNetProfit) || '-', 20, 30);

            pdf.text('Total net profit made last year? ', 20, 50);
            pdf.text(String(surveyData.totalLastYearNetProfit) || '-', 20, 60);

            pdf.text('Number of people employed? ', 20, 80);
            pdf.text(String(surveyData.employeesNo) || '-', 20, 90);

            pdf.text('Website address: ', 20, 110);
            pdf.text(surveyData.website || '-', 20, 120);

            pdf.text('Business owner description: ', 20, 140);
            pdf.text(surveyData.businessOwnerDescription || '-', 20, 150, {
              maxWidth: 170,
            });

            const fileName = `business-owner-${this.businessOwner.id}-survey.pdf`;
            pdf.save(fileName);
          } catch (error) {
            console.error('Error generating PDF:', error);
            this.alertService.push({
              message: 'Error generating PDF',
              type: AlertType.Danger,
            });
          }
        },
        error: (error) => {
          console.error('Error fetching survey data:', error);
          this.alertService.push({
            message: 'Something went wrong while fetching survey data',
            type: AlertType.Danger,
          });
        },
      });
  }

  async downloadCreditRatingCsv(id: number) {
    this.downloading = true;
    this.investmentRequestService.getCreditRatingDataResponse(id).subscribe({
      next: (creditRating: CreditRatingDataResponse) => {
        try {
          let csv = '';

          csv += 'PSR: ' + creditRating.psr + '\n';
          csv += 'Rating: ' + creditRating.rating + '\n';
          csv += 'R: ' + creditRating.r + '\n';
          csv += 'M: ' + creditRating.m + '\n';
          csv += 'A: ' + creditRating.a + '\n';
          csv += 'Return Term: ' + creditRating.returnTerm + '\n';
          csv += 'Requested Amount: ' + creditRating.requestedAmount + '\n';
          csv += 'Net Return: ' + creditRating.netReturn + '\n';
          csv += 'Net Return To Share: ' + creditRating.netReturnToShare + '\n';
          csv += 'Total Number of Months: ' + creditRating.totalNoMonth + '\n';
          csv += 'Outflow Exceed: ' + creditRating.outflowExceed + '\n';
          csv += 'Negative Balance: ' + creditRating.negativeBalance + '\n';
          csv += 'No Earning: ' + creditRating.noEarning + '\n';
          csv += 'vInflow: ' + creditRating.vInflow + '\n';
          csv += 'vTotal: ' + creditRating.vTotal + '\n';
          csv += 'Average E: ' + creditRating.averageE + '\n';
          csv += 'Average L: ' + creditRating.averageL + '\n';
          csv += 'O: ' + creditRating.o + '\n';
          csv += 'I: ' + creditRating.i + '\n';
          csv += 'D1: ' + creditRating.d1 + '\n';
          csv += 'D2: ' + creditRating.d2 + '\n';
          csv += 'D0: ' + creditRating.d0 + '\n';
          csv += 'POD: ' + creditRating.pod + '\n';
          csv += 'Maximum Loan Calculated: ' + creditRating.maxLoanCalc + '\n';
          csv += 'Low: ' + creditRating.low + '\n';
          csv += 'High: ' + creditRating.high + '\n';

          const blob = new Blob([csv], {
            type: 'text/plain;charset=utf-8',
          });
          saveAs(blob, `investment-request-${id}-credit-rating.csv`);
          this.downloading = false;
        } catch (error) {
          console.error('Error generating CSV:', error);
          this.alertService.push({
            message: 'Error generating CSV',
            type: AlertType.Danger,
          });
          this.downloading = false;
        }
      },
      error: (error) => {
        console.error('Error fetching credit rating data:', error);
        this.alertService.push({
          message: 'Something went wrong while fetching credit rating data',
          type: AlertType.Danger,
        });
        this.downloading = false;
      },
    });
  }

  refreshBusinessOwner(id: number) {
    this.loading = true;
    this.businessOwnerService.getBusinessOwnerByIdForAdmin(id).subscribe({
      next: (data) => {
        this.businessOwner = data;
        this.loading = false;
        this.dataSource.data = data.investors;
        this.businessOwner.isBlocked = data.isBlocked;
        this.iconType = this.businessOwner.isBlocked
          ? Icon.Block
          : Icon.Unblock;
      },
      error: () => {
        this.alertService.push({
          message: 'Something went wrong',
          type: AlertType.Danger,
        });
        this.router.navigate([Link.AdminPanelBusinessOwnersList]);
      },
    });
  }

  getInvestmentRequests(id: number) {
    this.loading = true;
    this.businessOwnerService.getBusinessOwnerByIdForAdmin(id).subscribe({
      next: (data: BusinessOwnerGetDetailedAdminResponse) => {
        this.investmentRequests = data.investmentRequests;
        this.loading = false;

        const transformedRequests = this.investmentRequests.map((request) => ({
          id: request.id,
          approvedAt: request.approvedAt,
          loanPurpose: request.loanPurpose,
          helpIncreaseProfit: request.helpIncreaseProfit,
          requiredCapital: request.requiredCapital,
          returnTerm: request.returnTerm,
          rating: request.rating,
          ratingUpdate: request.ratingUpdate,
          dti: request.dti,
          status: request.status,
        }));

        this.dataSourceRequests.data = transformedRequests;
      },
      error: () => {
        this.alertService.push({
          message: 'Something went wrong while fetching investment requests',
          type: AlertType.Danger,
        });
      },
    });
  }

  blockBusinessOwner() {
    const newIsBlockedState = !this.businessOwner.isBlocked;
    this.businessOwnerService
      .blockOrUnblockBusinessOwner(this.businessOwner.id, newIsBlockedState)
      .subscribe({
        next: () => {
          this.businessOwner.isBlocked = newIsBlockedState;
          this.iconType = newIsBlockedState ? Icon.Block : Icon.Unblock;
        },
        error: () => {
          this.alertService.push({
            message:
              'You cannot block business owner with an active investment request',
            type: AlertType.Danger,
          });
        },
      });
  }

  openModal(businessOwnerId: number, investmentRequestId: number): void {
    const dialogRef = this.dialog.open(ModalManualProcessingComponent, {
      data: {
        businessOwnerId: businessOwnerId,
        investmentRequestId: investmentRequestId,
      },
      maxHeight: '100vh',
    });

    dialogRef.componentInstance.changesSaved.subscribe((saved) => {
      if (saved) {
        this.getInvestmentRequests(this.businessOwner.id);
      }
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  toggleShowMoreInflowDescription() {
    this.showMoreInflowDescription = !this.showMoreInflowDescription;
  }

  toggleShowMoreOutflowDescription() {
    this.showMoreOutflowDescription = !this.showMoreOutflowDescription;
  }

  openEditDialog() {
    this.dialog
      .open(UpdateBusinessOwnerDialogComponent, {
        data: this.businessOwner,
      })
      .afterClosed()
      .subscribe((refresh) => {
        if (refresh) {
          this.refreshBusinessOwner(this.businessOwner.id);
        }
      });
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
