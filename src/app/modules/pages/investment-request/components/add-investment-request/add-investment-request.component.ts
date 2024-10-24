import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {
  catchError,
  delayWhen,
  from,
  mergeMap,
  of,
  Subscription,
  tap,
  zip,
  map,
} from 'rxjs';
import { businessPurposeListConst } from 'src/app/modules/auth/views/business-survey-page/consts/business-propouse-list.const';
import { returnTermListConst } from 'src/app/modules/auth/views/business-survey-page/consts/return-term-list.const';
import { AlertType } from 'src/app/shared/components/alert/alert.enum';
import { ButtonColor } from 'src/app/shared/components/button/button-color.enum';
import { ButtonType } from 'src/app/shared/components/button/button-type.enum';
import { Icon } from 'src/app/shared/components/icon/icon.enum';
import { InputType } from 'src/app/shared/components/input/input-type.enum';
import { LoanPurpose } from 'src/app/shared/enums/loan-purpose.enum';
import { Link } from 'src/app/shared/links.const';
import { BusinessOwnerProfileGetResponse } from 'src/app/shared/models/business-owner-profile-get-response.interface';
import { BusinessOwnerProfileUpdate } from 'src/app/shared/models/business-owner-profile-update.interface';
import { CreateInvestmentRequestDto } from 'src/app/shared/models/investment-request-create.interface';
import { InvestmentRequestGetBusinessOwnerResponse } from 'src/app/shared/models/investment-request-get-business-owner-response.interface';
import { InvestmentRequestService } from 'src/app/shared/services/investment-request.service';
import { BusinessOwnerProfileService } from 'src/app/shared/services/business-owner-profile.service';
import { AlertService } from 'src/app/shared/services/alert.service';
import { MatDialog } from '@angular/material/dialog';
import { InvestmentRequestPatch } from 'src/app/shared/models/investment-request-patch.interface';
import { AcceptedModalInvestmentRequestComponent } from '../accepted-modal-investment-request/accepted-modal-investment-request.component';
import { ExtendModalInvestmentRequestComponent } from '../extend-modal-investment-request/extend-modal-investment-request.component';
import { InvestmentStatus } from 'src/app/shared/enums/investment-status.enum';

@Component({
  selector: 'app-add-investment-request',
  templateUrl: './add-investment-request.component.html',
  styleUrls: ['./add-investment-request.component.scss'],
})
export class AddInvestmentRequestComponent {
  InvestmentStatus = InvestmentStatus;
  isAcceptingInvestment = false;
  isDecliningInvestment = false;
  isButtonDisabled = false;
  charCount2: number = 0;
  charCount3: number = 0;
  charCount4: number = 0;
  charCount5: number = 0;
  maxLength: number = 2400;
  loadingCustomerData: boolean = true;
  investmentRequestsLoaded: boolean = false;
  subs: Subscription = new Subscription();
  inputType = InputType;
  icon = Icon;
  buttonType = ButtonType;
  buttonColor = ButtonColor;
  businessOwner!: BusinessOwnerProfileGetResponse;
  file?: File | null;
  newInvestmentsRequestsControlIds: number[] = [];

  loanPurposeList = businessPurposeListConst.filter(
    (x) => x.value != LoanPurpose.FinanceDebtObligation
  );
  returnTermList = returnTermListConst;
  private investmentRequestAdded = false;

  form: FormGroup = new FormGroup({
    companyName: new FormControl(null, []),
    ownerName: new FormControl(null, []),
    street: new FormControl(null, []),
    city: new FormControl(null, []),
    zipCode: new FormControl(null, []),
    phone: new FormControl(null, []),
    website: new FormControl(null, []),
    industry: new FormControl(null, []),
    subIndustry: new FormControl(null, []),
    description: new FormControl(null, []),
  });

  constructor(
    private router: Router,
    private businessOwnerProfileService: BusinessOwnerProfileService,
    private alertService: AlertService,
    private investmentRequestService: InvestmentRequestService,
    private dialog: MatDialog
  ) {}

  navigateToInstallments(id: number) {
    if (id && !isNaN(id)) {
      this.router.navigate([Link.InstallmentsInvestmentRequest(id)]);
    } else {
      console.error('Wrong ID');
    }
  }

  ngOnInit(): void {
    this.refreshProfileData();
    this.loadInvestmentRequests();

    setTimeout(() => {
      this.businessOwner.investmentRequests.forEach((investmentRequest) => {
        const loanPurposeControlName = `loanPurpose-${investmentRequest.id}`;
        const loanPurposeValue =
          this.form.get(loanPurposeControlName)?.value || '';
        this.charCount4 += loanPurposeValue.length;

        const helpIncreaseProfitControlName = `helpIncreaseProfit-${investmentRequest.id}`;
        const helpIncreaseProfitValue =
          this.form.get(helpIncreaseProfitControlName)?.value || '';
        this.charCount5 += helpIncreaseProfitValue.length;
      });
    }, 500);
  }

  onDescriptionChange(fieldName: string, id?: number, event?: any) {
    if (fieldName === 'newLoanPurpose' && id !== undefined) {
      const controlName = `newLoanPurpose-${id}`;
      this.charCount2 = this.form.get(controlName)?.value.length || 0;
    } else if (fieldName === 'newHelpIncreaseProfit' && id !== undefined) {
      const controlName = `newHelpIncreaseProfit-${id}`;
      this.charCount3 = this.form.get(controlName)?.value.length || 0;
    } else if (fieldName === 'editLoanPurpose' && id !== undefined && event) {
      const controlName = `editLoanPurpose-${id}`;
      this.charCount4 = event.target.value.length || 0;
      this.form.get(controlName)?.setValue(event.target.value);
    } else if (
      fieldName === 'editHelpIncreaseProfit' &&
      id !== undefined &&
      event
    ) {
      const controlName = `editHelpIncreaseProfit-${id}`;
      this.charCount5 = event.target.value.length || 0;
      this.form.get(controlName)?.setValue(event.target.value);
    }
  }

  updateInvestmentRequest(id: number) {
    const updatedData = {
      loanPurpose: this.form.get(`loanPurpose-${id}`)?.value,
      helpIncreaseProfit: this.form.get(`helpIncreaseProfit-${id}`)?.value,
      netReturn: parseFloat(this.form.get(`netReturn-${id}`)?.value),
      netReturnToShare: parseFloat(
        this.form.get(`netReturnToShare-${id}`)?.value
      ),
    };
    this.investmentRequestService.update(id, updatedData).subscribe(
      () => {
        this.alertService.push({
          message:
            'You have successfully run updates. Your investment will soon be extended for 7 days.',
          type: AlertType.Success,
        });
        this.loadInvestmentRequests();
        setTimeout(() => {
          window.location.reload();
        }, 5000);
      },
      (err) => {
        this.alertService.push({
          message: err.error.message,
          type: AlertType.Danger,
        });
      }
    );
  }

  submitRequest() {
    this.form.updateValueAndValidity();
    this.form.markAllAsTouched();

    if (this.form.invalid) return;

    this.form.disable();

    let newInvestmentRequest: CreateInvestmentRequestDto;
    let modalErrorDisplayed = false;

    of(null)
      .pipe(
        delayWhen(() => {
          if (this.newInvestmentsRequestsControlIds.length === 0)
            return of(null);

          return zip(
            this.newInvestmentsRequestsControlIds.map((x) =>
              of(x).pipe(
                delayWhen((id) => {
                  newInvestmentRequest = this.getNewInvestmentRequestById(id);

                  return this.investmentRequestService
                    .create(newInvestmentRequest)
                    .pipe(
                      catchError((err) => {
                        if (
                          err.error.message &&
                          err.error.message.trim() !== ''
                        ) {
                          this.alertService.push({
                            message: err.error.message,
                            type: AlertType.Danger,
                          });
                        }
                        if (err.error && err.error.message) {
                          this.openModal(err.error.message);
                          modalErrorDisplayed = true;
                        }
                        return of(null);
                      }),
                      tap((newInvestmentRequest) => {
                        if (newInvestmentRequest) {
                          this.removeNewInvestmentRequest(id);
                        }
                      })
                    );
                })
              )
            )
          );
        }),
        tap(() => {
          if (!modalErrorDisplayed) {
            if (newInvestmentRequest.returnTerm > 36) {
              this.openModal(
                'You selected term over 3 years, your application would be send for manual processing or you can change the term'
              );
            } else {
              this.openModal(
                `Congratulations, You are approved for ${newInvestmentRequest.requiredCapital}$ loan. ` +
                  `Please wait for the fund raising. The raised amount could be less than approved amount`
              );
            }
          }
        }),
        catchError(() => {
          return of(null);
        })
      )
      .subscribe({
        next: () => {
          this.form.markAsUntouched();
          this.form.markAsPristine();
          this.form.enable();
          this.refreshProfileData();
          this.loadInvestmentRequests();
          if (!modalErrorDisplayed) {
            this.closeForm();
          }
        },
        error: (err) => {
          this.alertService.push({
            message: err.error.message,
            type: AlertType.Danger,
          });
          this.form.enable();
          if (Array.isArray(err.error.message)) {
            let messages: string[] = err.error.message;
            messages.forEach((message) => {
              this.alertService.push({
                message,
                type: AlertType.Danger,
              });
            });
          } else {
            this.alertService.push({
              message: 'Something went wrong',
              type: AlertType.Danger,
            });
          }
        },
      });
  }

  closeForm() {
    for (const id of this.newInvestmentsRequestsControlIds) {
      this.form.removeControl(`newPurposeOfTheLoan-${id}`);
      this.form.removeControl(`newReturnTerm-${id}`);
      this.form.removeControl(`newRequiredCapital-${id}`);
      this.form.removeControl(`newNetReturn-${id}`);
      this.form.removeControl(`newNetReturnToShare-${id}`);
      this.form.removeControl(`newLoanPurpose-${id}`);
      this.form.removeControl(`newHelpIncreaseProfit-${id}`);
      this.form.removeControl(`newProfitIncrease-${id}`);
    }
    this.newInvestmentsRequestsControlIds = [];
  }

  addInvestmentRequest(): string {
    if (!this.investmentRequestAdded) {
      const newId = new Date().valueOf();
      this.form.addControl(
        `newPurposeOfTheLoan-${newId}`,
        new FormControl(LoanPurpose.WorkingCapital, [Validators.required])
      );
      this.form.addControl(
        `newReturnTerm-${newId}`,
        new FormControl(null, [Validators.required])
      );
      this.form.addControl(
        `newRequiredCapital-${newId}`,
        new FormControl(null, [Validators.required])
      );
      this.form.addControl(
        `newNetReturn-${newId}`,
        new FormControl(null, [Validators.required])
      );
      this.form.addControl(
        `newNetReturnToShare-${newId}`,
        new FormControl(null, [Validators.required])
      );
      this.form.addControl(
        `newLoanPurpose-${newId}`,
        new FormControl(null, [Validators.required])
      );
      this.form.addControl(
        `newHelpIncreaseProfit-${newId}`,
        new FormControl(null, [Validators.required])
      );
      this.form.addControl(
        `newProfitIncrease-${newId}`,
        new FormControl(null, [Validators.required])
      );
      this.newInvestmentsRequestsControlIds.push(newId);

      this.loadInvestmentRequests();

      this.investmentRequestAdded = true;

      return newId.toString();
    } else {
      return 'You can only add one investment request.';
    }
  }

  getNewInvestmentRequestById(id: number): CreateInvestmentRequestDto {
    const newInvestmentRequest: CreateInvestmentRequestDto = {
      purposeOfTheLoan: this.form.get(`newPurposeOfTheLoan-${id}`)?.value,
      requiredCapital: parseInt(
        this.form.get(`newRequiredCapital-${id}`)?.value
      ),
      returnTerm: this.form.get(`newReturnTerm-${id}`)?.value,
      netReturn: parseInt(this.form.get(`newNetReturn-${id}`)?.value),
      netReturnToShare: parseInt(
        this.form.get(`newNetReturnToShare-${id}`)?.value
      ),
      loanPurpose: this.form.get(`newLoanPurpose-${id}`)?.value,
      helpIncreaseProfit: this.form.get(`newHelpIncreaseProfit-${id}`)?.value,
      profitIncrease: parseInt(this.form.get(`newProfitIncrease-${id}`)?.value),
    };
    return newInvestmentRequest;
  }

  refreshProfileData() {
    this.subs.add(
      this.businessOwnerProfileService.getMyProfile().subscribe((data) => {
        this.businessOwner = data;
        this.form.patchValue({
          companyName: data.companyName,
          ownerName: data.ownerName,
          street: data.street,
          city: data.city,
          zipCode: data.zipCode,
          phone: data.phone,
          website: data.website,
          mainindustry: data.businessSubsector.businessSector.business.name,
          industry: data.businessSubsector.businessSector.name,
          subIndustry: data.businessSubsector.name,
          description: data.businessDescription,
        });
        this.loadInvestmentRequests();
      })
    );
  }

  loadInvestmentRequests() {
    this.investmentRequestService
      .getAllinvestmentRequests()
      .subscribe((investmentRequests) => {
        investmentRequests.forEach((investmentReques) => {
          this.form.addControl(
            `purposeOfTheLoan-${investmentReques.id}`,
            new FormControl(investmentReques.purposeOfTheLoan)
          );
          this.form.addControl(
            `returnTerm-${investmentReques.id}`,
            new FormControl(`${investmentReques.returnTerm} months`)
          );
          this.form.addControl(
            `requiredCapital-${investmentReques.id}`,
            new FormControl(investmentReques.requiredCapital)
          );
          this.form.addControl(
            `netReturn-${investmentReques.id}`,
            new FormControl(investmentReques.netReturn)
          );
          this.form.addControl(
            `netReturnToShare-${investmentReques.id}`,
            new FormControl(investmentReques.netReturnToShare)
          );
          this.form.addControl(
            `status-${investmentReques.id}`,
            new FormControl(investmentReques.status)
          );
          this.form.addControl(
            `percentageRaised-${investmentReques.id}`,
            new FormControl(`${investmentReques.percentageRaised}%`)
          );
          this.form.addControl(
            `timeLeft-${investmentReques.id}`,
            new FormControl(`${investmentReques.timeLeft}`)
          );
          this.form.addControl(
            `loanPurpose-${investmentReques.id}`,
            new FormControl(investmentReques.loanPurpose)
          );
          this.form.addControl(
            `helpIncreaseProfit-${investmentReques.id}`,
            new FormControl(investmentReques.helpIncreaseProfit)
          );
          this.form.addControl(
            `profitIncrease-${investmentReques.id}`,
            new FormControl(investmentReques.profitIncrease)
          );
        });
        this.loadInvestmentRequests();
        this.form.markAsUntouched();
        this.investmentRequestsLoaded = true;
      });
  }

  acceptInvestmentRequest(
    investmentRequest: InvestmentRequestGetBusinessOwnerResponse
  ) {
    if (this.isButtonDisabled) {
      return;
    }

    this.isButtonDisabled = true;
    const investmentRequestId = investmentRequest.id;
    if (investmentRequest.percentageRaised < 100) {
      const dialogRef = this.dialog.open(
        ExtendModalInvestmentRequestComponent,
        {
          data: {
            investmentRequestId: investmentRequestId,
          },
        }
      );
    } else {
      this.isAcceptingInvestment = true;
      this.investmentRequestService.acceptLoan(investmentRequestId).subscribe(
        () => {
          this.alertService.push({
            message: 'Investment accepted',
            type: AlertType.Success,
          });
        },
        (err) => {
          if (err.error.message && err.error.message.trim() !== '') {
            this.alertService.push({
              message: err.error.message,
              type: AlertType.Danger,
            });
          }
          window.location.reload();
        }
      );
    }
  }

  declineInvestmentRequest(
    investmentRequest: InvestmentRequestGetBusinessOwnerResponse
  ) {
    const investmentRequestId = investmentRequest.id;
    this.isDecliningInvestment = true;
    this.investmentRequestService.declineLoan(investmentRequestId).subscribe(
      () => {
        this.alertService.push({
          message: 'Investment declined',
          type: AlertType.Success,
        });
      },
      (err) => {
        if (err.error.message && err.error.message.trim() !== '') {
          this.alertService.push({
            message: err.error.message,
            type: AlertType.Danger,
          });
        }
        window.location.reload();
      }
    );
  }

  removeInvestmentRequest(
    investmentRequest: InvestmentRequestGetBusinessOwnerResponse,
    parentHtmlElement: HTMLElement
  ) {
    parentHtmlElement.classList.add('loading');
    this.subs.add(
      this.investmentRequestService.delete(investmentRequest.id).subscribe({
        next: () => {
          this.businessOwner.investmentRequests =
            this.businessOwner.investmentRequests.filter(
              (x) => x.id != investmentRequest.id
            );
          this.form.removeControl(`purposeOfTheLoan-${investmentRequest.id}`);
          this.form.removeControl(`returnTerm-${investmentRequest.id}`);
          this.form.removeControl(`requiredCapital-${investmentRequest.id}`);
          this.form.removeControl(`netReturn-${investmentRequest.id}`);
          this.form.removeControl(`status-${investmentRequest.id}`);
          this.form.removeControl(`percentageRaised-${investmentRequest.id}`);
          this.form.removeControl(`timeLeft-${investmentRequest.id}`);
          this.form.removeControl(`loanPurpose-${investmentRequest.id}`);
          this.form.removeControl(`helpIncreaseProfit-${investmentRequest.id}`);
          this.form.removeControl(`profitIncrease-${investmentRequest.id}`);
          this.alertService.push({
            message: 'Investment request deleted successfully',
            type: AlertType.Success,
          });
          this.loadInvestmentRequests();
        },
        error: (err) => {
          this.alertService.push({
            message: err.error.message,
            type: AlertType.Danger,
          });
          parentHtmlElement.classList.remove('loading');
        },
      })
    );
  }

  removeNewInvestmentRequest(id: number) {
    this.newInvestmentsRequestsControlIds =
      this.newInvestmentsRequestsControlIds.filter((x) => x != id);
    this.form.removeControl(`newPurposeOfTheLoan-${id}`);
    this.form.removeControl(`newReturnTerm-${id}`);
    this.form.removeControl(`newRequiredCapital-${id}`);
    this.form.removeControl(`newNetReturn-${id}`);
    this.form.removeControl(`netReturnToShare-${id}`);
    this.form.removeControl(`newLoanPurpose-${id}`);
    this.form.removeControl(`newHelpIncreaseProfit-${id}`);
    this.form.removeControl(`newProfitIncrease-${id}`);
  }

  navigateToDetails(id: number) {
    if (id && !isNaN(id)) {
      this.router.navigate([Link.DetailsInvestmentRequest(id)]);
    } else {
      console.error('Wrong ID');
    }
  }

  openModal(message: string): void {
    const dialogRef = this.dialog.open(
      AcceptedModalInvestmentRequestComponent,
      {
        maxHeight: '100vh',
        data: { message },
      }
    );
  }

  navigateToPreview() {
    this.router.navigate([Link.PreviewBusinessOwnerProfile]);
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
