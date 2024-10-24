import { Component, OnInit, ViewChild } from '@angular/core';
import { ButtonColor } from 'src/app/shared/components/button/button-color.enum';
import { ButtonType } from 'src/app/shared/components/button/button-type.enum';
import { Icon } from 'src/app/shared/components/icon/icon.enum';
import { InputType } from 'src/app/shared/components/input/input-type.enum';
import { Router } from '@angular/router';
import { Link } from 'src/app/shared/links.const';
import { ActivatedRoute } from '@angular/router';
import { InvestmentRequestService } from 'src/app/shared/services/investment-request.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { GetLoanBusinessOwnerResponse } from 'src/app/shared/models/get-loan-business-owner-response.interface';
import { AlertType } from 'src/app/shared/components/alert/alert.enum';
import { AlertService } from 'src/app/shared/services/alert.service';

@Component({
  selector: 'app-installments-investment-request',
  templateUrl: './installments-investment-request.component.html',
  styleUrls: ['./installments-investment-request.component.scss'],
})
export class InstallmentsInvestmentRequestComponent {
  showTooltip = false;
  inputType = InputType;
  icon = Icon;
  buttonType = ButtonType;
  buttonColor = ButtonColor;
  id!: number;
  installmentsInvestmentRequest: GetLoanBusinessOwnerResponse | null = null;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  dataSource = new MatTableDataSource();
  displayedColumns: string[] = [
    'no',
    'paymentDate',
    'totalRevenue',
    'totalNetProfit',
    'profitToShare',
    'transfer',
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private alertService: AlertService,
    private investmentRequestService: InvestmentRequestService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.id = +params['id'];
      if (!isNaN(this.id)) {
        this.getLastLoan(this.id);
      }
    });
  }

  getLastLoan(id: number): void {
    this.investmentRequestService.getLastLoan(id).subscribe(
      (response: GetLoanBusinessOwnerResponse) => {
        this.installmentsInvestmentRequest = response;
        this.dataSource.data = response.installments;
      },
      (err) => {
        this.alertService.push({
          message: err.error.message,
          type: AlertType.Danger,
        });
      }
    );
  }

  navigateToBack() {
    this.router.navigate([Link.InvestmentRequest]);
  }
}
