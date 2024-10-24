import { Component, OnInit, ViewChild, Input } from '@angular/core';
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
import { AlertType } from 'src/app/shared/components/alert/alert.enum';
import { AlertService } from 'src/app/shared/services/alert.service';
import { GetLoanInvestorResponse } from 'src/app/shared/models/get-loan-investor-response.interface';

@Component({
  selector: 'app-installments-investor',
  templateUrl: './installments-investor.component.html',
  styleUrls: ['./installments-investor.component.scss'],
})
export class InstallmentsInvestorComponent {
  showTooltip = false;
  inputType = InputType;
  icon = Icon;
  buttonType = ButtonType;
  buttonColor = ButtonColor;
  id!: number;
  installmentsInvestmentRequest: GetLoanInvestorResponse | null = null;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  dataSource = new MatTableDataSource();
  displayedColumns: string[] = [
    'no',
    'paymentDate',
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
        this.getLastLoanForInvestor(this.id);
      }
    });
  }

  getLastLoanForInvestor(id: number): void {
    this.investmentRequestService.getLastLoanForInvestor(id).subscribe(
      (response: GetLoanInvestorResponse) => {
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
    this.router.navigate([Link.Investments]);
  }
}
