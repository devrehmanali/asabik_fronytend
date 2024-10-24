import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { debounce, interval, Subscription } from 'rxjs';
import { AlertType } from 'src/app/shared/components/alert/alert.enum';
import { BusinessOwnerGetResponse } from 'src/app/shared/models/business-owner-get-response.interface';
import { AlertService } from 'src/app/shared/services/alert.service';
import { BusinessOwnerService } from 'src/app/shared/services/business-owner.service';
import { Icon } from 'src/app/shared/components/icon/icon.enum';
import { ButtonColor } from 'src/app/shared/components/button/button-color.enum';
import { InvestmentRequestService } from 'src/app/shared/services/investment-request.service';

@Component({
  selector: 'app-investments-investor',
  templateUrl: './investments-investor.component.html',
  styleUrls: ['./investments-investor.component.scss'],
})
export class InvestmentsInvestorComponent {
  loading: boolean = true;
  subs: Subscription = new Subscription();
  businessOwners: BusinessOwnerGetResponse[] = [];

  public ButtonColor = ButtonColor;
  public Icon = Icon;

  form: FormGroup = new FormGroup({
    search: new FormControl(null, []),
  });

  constructor(
    private businessOwnerService: BusinessOwnerService,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.refreshList();
    this.subs.add(
      this.form
        .get('search')
        ?.valueChanges.pipe(
          debounce((x) => (x != '' ? interval(300) : interval(1)))
        )
        .subscribe((companyName) => {
          this.refreshList(companyName);
        })
    );
  }

  refreshList(companyName?: string) {
    this.loading = true;
    this.subs.add(
      this.businessOwnerService.getAll(companyName).subscribe({
        next: (data) => {
          this.loading = false;
          this.businessOwners = data.filter(
            (businessOwner) => businessOwner.isInvested
          );
        },
        error: (err) => {
          this.alertService.push({
            message: err.error.message,
            type: AlertType.Danger,
          });
        },
      })
    );
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
