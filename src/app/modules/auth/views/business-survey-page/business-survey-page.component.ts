import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { Router } from '@angular/router';
import { businessPurposeListConst } from './consts/business-propouse-list.const';
import { monthlySalesListConst } from './consts/mothly-sales-list.const';
import { returnTermListConst } from './consts/return-term-list.const';
import { businessStructureListConst } from './consts/business-structure-list.const';
import { Link } from 'src/app/shared/links.const';
import { SurveyService } from 'src/app/shared/services/survey.service';
import { CurrentUserService } from 'src/app/core/services/current-user.service';
import { AlertService } from 'src/app/shared/services/alert.service';
import { AlertType } from 'src/app/shared/components/alert/alert.enum';
import { BusinessOwnerSurvey } from 'src/app/shared/models/business-owner-survey.interface';
import { LoanPurpose } from 'src/app/shared/enums/loan-purpose.enum';
import { InputType } from 'src/app/shared/components/input/input-type.enum';
import { Icon } from 'src/app/shared/components/icon/icon.enum';
import { BusinessGetResponse } from 'src/app/shared/models/business-get-response.interface';
import { Subscription } from 'rxjs';
import { BusinessService } from 'src/app/shared/services/business.service';
import { BusinessStructure } from 'src/app/shared/enums/business-structure.enum';
import { debounceTime } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { StatementBusinessOwnerSurveyModalComponent } from '../statement-business-owner-survey-modal/statement-business-owner-survey-modal.component';
import { ButtonColor } from 'src/app/shared/components/button/button-color.enum';

@Component({
  selector: 'app-business-survey-page',
  templateUrl: './business-survey-page.component.html',
  styleUrls: ['./business-survey-page.component.scss'],
})
export class BusinessSurveyPageComponent implements OnInit {
  buttonColor = ButtonColor;
  steps: number = 12;
  currentStep: number = 1;
  returnTermList = returnTermListConst;
  isQualifies: boolean = true;

  charCount1 = 0;
  charCount2 = 0;
  maxLength: number = 2400;
  projectedNetReturnValue: number = 100;

  businessesList: BusinessGetResponse[] = [];
  businessSectorsList: BusinessGetResponse[] = [];
  businessSubsectorsList: BusinessGetResponse[] = [];

  businessPurposeList = businessPurposeListConst;
  businessStructureList = businessStructureListConst;
  monthlySalesList = monthlySalesListConst;

  inputType = InputType;
  icon = Icon;
  subs: Subscription = new Subscription();

  //1
  businessStartForm: FormGroup = new FormGroup({
    date: new FormControl(new Date(), [Validators.required]),
  });
  //2
  businessPurposeForm: FormGroup = new FormGroup({
    purpose: new FormControl(null, [Validators.required]),
  });
  //3
  businessPurposeDescriptionForm: FormGroup = new FormGroup({
    loanPurpose: new FormControl(null, [
      Validators.required,
      Validators.minLength(500),
      Validators.maxLength(2400),
    ]),
    helpIncreaseProfit: new FormControl(null, [
      Validators.required,
      Validators.minLength(500),
      Validators.maxLength(2400),
    ]),
    profitIncrease: new FormControl(2000, [Validators.required]),
  });
  //4
  returnTermForm: FormGroup = new FormGroup({
    months: new FormControl(null, [Validators.required]),
    amount: new FormControl(2000, [Validators.required]),
  });
  //5
  businessForm: FormGroup = new FormGroup({
    business: new FormControl(null, [Validators.required]),
  });
  //6
  businessSectorForm: FormGroup = new FormGroup({
    businessSector: new FormControl(null, [Validators.required]),
  });
  //7
  businessSubsectorForm: FormGroup = new FormGroup({
    businessSubsector: new FormControl(null, [Validators.required]),
  });
  //8
  businessStructureForm: FormGroup = new FormGroup({
    businessStructure: new FormControl(null, [Validators.required]),
    employeesNo: new FormControl(0, [
      Validators.required,
      Validators.min(1),
      Validators.max(5_000_000),
    ]),
  });
  //9
  businessMonthlySalesForm: FormGroup = new FormGroup({
    avrMonthlySales: new FormControl(0, [Validators.required]),
    avrMonthlyNetProfit: new FormControl(0, [Validators.required]),
    totalLastYearNetProfit: new FormControl(0, [Validators.required]),
  });
  //10
  netReturnTermForm: FormGroup = new FormGroup({
    netReturn: new FormControl(0, [Validators.required]),
    netReturnToShare: new FormControl(0, [Validators.required]),
  });
  //11
  websiteAddressForm: FormGroup = new FormGroup({
    websiteAddress: new FormControl(null),
  });

  constructor(
    private router: Router,
    private surveyService: SurveyService,
    private currentUserService: CurrentUserService,
    private alertService: AlertService,
    private businessService: BusinessService,
    private fb: FormBuilder,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.initNetReturnTermForm();
    this.updateBusinessesList();
    this.openModal();
  }

  openModal() {
    const dialogRef = this.dialog.open(
      StatementBusinessOwnerSurveyModalComponent,
      {
        maxHeight: '100vh',
      }
    );
  }

  private initNetReturnTermForm() {
    this.netReturnTermForm = this.fb.group({
      netReturn: [1000, [Validators.required]],
      netReturnToShare: [1000, [Validators.required]],
    });

    this.netReturnTermForm
      .get('netReturn')
      ?.valueChanges.pipe(debounceTime(500))
      .subscribe(() => {
        this.calculateProjectedNetReturn();
      });

    this.netReturnTermForm
      .get('netReturnToShare')
      ?.valueChanges.pipe(debounceTime(500))
      .subscribe(() => {
        this.calculateProjectedNetReturn();
      });
  }

  calculateProjectedNetReturn(): void {
    const netReturn = this.netReturnTermForm.value.netReturn;
    const netReturnToShare = this.netReturnTermForm.value.netReturnToShare;

    if (netReturn && netReturnToShare) {
      let projectedNetReturn = (netReturnToShare / netReturn) * 100;
      projectedNetReturn = parseFloat(projectedNetReturn.toFixed(3));

      this.projectedNetReturnValue = projectedNetReturn;
    } else {
      this.projectedNetReturnValue = 0;
    }
  }

  blockSpecialChars(inputElement: HTMLInputElement) {
    const regex = /^[0-9]*$/;

    const inputValue = inputElement.value;
    const newValue = inputValue.replace(/[,.\\-]/g, '');

    if (!regex.test(newValue)) {
      inputElement.value = newValue;
    }
  }

  onDescriptionChange(controlName: string) {
    const control = this.businessPurposeDescriptionForm.get(controlName);
    if (control) {
      const value = control.value;
      if (controlName === 'loanPurpose') {
        this.charCount1 = value.length;
      } else if (controlName === 'helpIncreaseProfit') {
        this.charCount2 = value.length;
      }
    }
  }

  updateBusinessesList() {
    this.subs.add(
      this.businessService.getAll().subscribe((businesses) => {
        this.businessesList = businesses;

        this.businessForm.reset();
        this.businessSectorForm.reset();
        this.businessSubsectorForm.reset();
      })
    );
  }

  updateBusinessSectorList() {
    this.subs.add(
      this.businessService
        .getBusinessSectors(this.businessForm.value.business)
        .subscribe((sectors) => {
          this.businessSectorsList = sectors;

          this.businessSectorForm.reset();
          this.businessSubsectorForm.reset();
        })
    );
  }

  updateBusinessSubsectorList() {
    this.subs.add(
      this.businessService
        .getBusinessSubsectors(
          this.businessForm.value.business,
          this.businessSectorForm.value.businessSector
        )
        .subscribe((subsectors) => {
          this.businessSubsectorsList = subsectors;
          this.businessSubsectorForm.reset();
        })
    );
  }

  formatItemId(id: number): string {
    if (id >= 1000 && id <= 9999) {
      const formattedId =
        id.toString().substring(0, 2) + '-' + id.toString().substring(2, 4);
      return formattedId;
    } else {
      return id.toString();
    }
  }

  nextStep() {
    if (this.currentStep < this.steps) {
      this.currentStep++;
    }
  }

  previousStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  sendData() {
    let businessSurveyData: BusinessOwnerSurvey = {
      businessStartDate: this.businessStartForm.value.date,
      investmentRequest: {
        purposeOfTheLoan: this.businessPurposeForm.value.purpose as LoanPurpose,
        requiredCapital: this.returnTermForm.value.amount,
        netReturn: this.returnTermForm.value.amount,
        netReturnToShare: this.returnTermForm.value.amount,
        returnTerm: this.returnTermForm.value.months,
        loanPurpose: this.businessPurposeDescriptionForm.value.loanPurpose,
        helpIncreaseProfit:
          this.businessPurposeDescriptionForm.value.helpIncreaseProfit,
        profitIncrease:
          this.businessPurposeDescriptionForm.value.profitIncrease,
      },
      businessStructure: this.businessStructureForm.value
        .businessStructure as BusinessStructure,
      avrMonthlySales: this.businessMonthlySalesForm.value.avrMonthlySales,
      avrMonthlyNetProfit:
        this.businessMonthlySalesForm.value.avrMonthlyNetProfit,
      totalLastYearNetProfit:
        this.businessMonthlySalesForm.value.totalLastYearNetProfit,
      employeesNo: this.businessStructureForm.value.employeesNo,
      businessSubindustryId: this.businessSubsectorForm.value.businessSubsector,
    };

    this.surveyService.sendBussinesOwnerSurvey(businessSurveyData).subscribe({
      next: (data) => {
        this.currentUserService.removeCurrentUser().subscribe();
        this.router.navigate([Link.SaurveyStatus], {
          queryParams: { surveyStatus: data.surveyStatus },
        });
      },
      error: (err) => {
        this.alertService.push({
          message: err.error.message
            ? err.error.message
            : 'Something went wrong',
          type: AlertType.Danger,
        });
        this.currentUserService.removeCurrentUser().subscribe();
        this.router.navigate([Link.LogIn]);
      },
    });
  }
}
