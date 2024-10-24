import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ButtonColor } from 'src/app/shared/components/button/button-color.enum';
import { ButtonType } from 'src/app/shared/components/button/button-type.enum';
import { Icon } from 'src/app/shared/components/icon/icon.enum';
import { InputType } from 'src/app/shared/components/input/input-type.enum';
import { Router } from '@angular/router';
import { Link } from 'src/app/shared/links.const';
import { ActivatedRoute } from '@angular/router';
import { InvestmentRequestService } from 'src/app/shared/services/investment-request.service';
import { InvestmentRequestGetDetailedResponse } from 'src/app/shared/models/investment-request-get-detailed-response.interface';
import { AlertService } from 'src/app/shared/services/alert.service';
import { AlertType } from 'src/app/shared/components/alert/alert.enum';

@Component({
  selector: 'app-details-investment-request',
  templateUrl: './details-investment-request.component.html',
  styleUrls: ['./details-investment-request.component.scss'],
})
export class DetailsInvestmentRequestComponent {
  inputType = InputType;
  icon = Icon;
  buttonType = ButtonType;
  buttonColor = ButtonColor;
  id!: number;
  investmentRequestDetails: InvestmentRequestGetDetailedResponse | null = null;

  form: FormGroup = new FormGroup({
    amountToBeDeposited: new FormControl(null),
    totalPayback: new FormControl(null),
    monthlyPayment: new FormControl(null),
    nextInstallmentAmount: new FormControl(null),
    nextInstallmentDate: new FormControl(null),
    nextPlaidVerifDate: new FormControl(null),
    finalPaymentAmount: new FormControl(null),
    finalPaymentDate: new FormControl(null),
    dti: new FormControl(null),
    rating: new FormControl(null),
    approvedAt: new FormControl(null),
  });

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private investmentRequestService: InvestmentRequestService,
    private alertService: AlertService
  ) {}

  navigateToBack() {
    this.router.navigate([Link.InvestmentRequest]);
  }

  deleteRequest() {
    if (this.investmentRequestDetails) {
      const idToDelete = this.investmentRequestDetails.id;
      this.investmentRequestService.delete(idToDelete).subscribe(
        (response) => {
          console.log('Request deleted successfully.', response);
          this.navigateToBack();
        },
        (err) => {
          this.alertService.push({
            message: err.error.message,
            type: AlertType.Danger,
          });
        }
      );
    }
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.id = +params['id'];
      this.investmentRequestService.getDetailedResponse(this.id).subscribe(
        (response: InvestmentRequestGetDetailedResponse) => {
          this.investmentRequestDetails = response;
        },
        (error: any) => {
          console.error('Error fetching investment request details:', error);
        }
      );
    });
  }
}
