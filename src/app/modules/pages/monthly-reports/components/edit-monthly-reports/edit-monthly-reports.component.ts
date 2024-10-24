import { Component } from '@angular/core';
import { Link } from 'src/app/shared/links.const';
import { Router } from '@angular/router';
import { Icon } from 'src/app/shared/components/icon/icon.enum';
import { ButtonColor } from 'src/app/shared/components/button/button-color.enum';
import { ButtonType } from 'src/app/shared/components/button/button-type.enum';
import { InputType } from 'src/app/shared/components/input/input-type.enum';
import { BusinessOwnerProfileService } from 'src/app/shared/services/business-owner-profile.service';
import { MonthlyReportRatingResponse } from 'src/app/shared/models/monthly-report-rating-response.interface';
import { BehaviorSubject } from 'rxjs';
import { AlertType } from 'src/app/shared/components/alert/alert.enum';
import { AlertService } from 'src/app/shared/services/alert.service';
import { UpdateMonthlyReportDto } from 'src/app/shared/models/update-monthly-report-dto.interface';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BusinessOwnerAlertsResponse } from 'src/app/shared/models/business-owner-alerts-response.interface';

@Component({
  selector: 'app-edit-monthly-reports',
  templateUrl: './edit-monthly-reports.component.html',
  styleUrls: ['./edit-monthly-reports.component.scss'],
})
export class EditMonthlyReportsComponent {
  maxLength: number = 500;
  charCount1: number = 0;
  charCount2: number = 0;
  icon = Icon;
  buttonType = ButtonType;
  buttonColor = ButtonColor;
  inputType = InputType;
  monthlyReport: MonthlyReportRatingResponse | null = null;
  isEditingSubject = new BehaviorSubject<boolean>(false);
  isEditing$ = this.isEditingSubject.asObservable();
  form: FormGroup = new FormGroup({
    inflow: new FormControl(null, []),
    inflowDescription: new FormControl(null, [Validators.maxLength(500)]),
    outflow: new FormControl(null, []),
    outflowDescription: new FormControl(null, [Validators.maxLength(500)]),
  });
  alerts: BusinessOwnerAlertsResponse | null = null;

  constructor(
    private router: Router,
    private businessOwnerProfileService: BusinessOwnerProfileService,
    private alertService: AlertService
  ) {}

  startEditing() {
    this.isEditingSubject.next(true);
  }

  sendMonthlyReport() {
    if (this.monthlyReport !== null) {
      const inflowValue = parseFloat(this.form.value.inflow);
      const outflowValue = parseFloat(this.form.value.outflow);

      if (!isNaN(inflowValue) && !isNaN(outflowValue)) {
        const updateMonthlyReportDto: UpdateMonthlyReportDto = {
          monthlyReportId: this.monthlyReport.id,
          inflowDescription: this.form.value.inflowDescription,
          inflow: inflowValue,
          outflow: outflowValue,
          outflowDescription: this.form.value.outflowDescription,
        };

        this.businessOwnerProfileService
          .updateBusinessOwnersMonthlyReport(updateMonthlyReportDto)
          .subscribe(
            () => {
              this.alertService.push({
                message: 'Monthly report sent successfully',
                type: AlertType.Success,
              });
              this.isEditingSubject.next(false);
              this.router.navigate([Link.Dashboard]);
            },
            (err) => {
              this.alertService.push({
                message: err.error.message,
                type: AlertType.Danger,
              });
            }
          );
      } else {
        this.alertService.push({
          message:
            'Invalid inflow or outflow value. Please enter valid numbers.',
          type: AlertType.Danger,
        });
      }
    }
  }

  confirmMonthlyReport() {
    if (this.monthlyReport !== null) {
      const confirmMonthlyReportDto = {
        monthlyReportId: this.monthlyReport.id,
      };

      this.businessOwnerProfileService
        .confirmMonthlyReport(confirmMonthlyReportDto)
        .subscribe(
          () => {
            this.alertService.push({
              message: 'Report confirmed',
              type: AlertType.Success,
            });
            this.router.navigate([Link.Dashboard]);
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

  ngOnInit() {
    this.businessOwnerProfileService.getBusinessOwnerAlerts().subscribe(
      (data) => {
        this.alerts = data;
        if (!data.isReportPending) {
          this.router.navigate([Link.Dashboard]);
        }
      },
      (err) => {
        this.alertService.push({
          message: err.error.message,
          type: AlertType.Danger,
        });
      }
    );
    this.businessOwnerProfileService.getBusinessOwnersMonthlyReport().subscribe(
      (data) => {
        this.monthlyReport = data;
      },
      (err) => {
        this.alertService.push({
          message: err.error.message,
          type: AlertType.Danger,
        });
      }
    );
  }

  updateCharCount1(event: Event) {
    const target = event.target as HTMLInputElement;
    this.charCount1 = target.value.length;
  }

  updateCharCount2(event: Event) {
    const target = event.target as HTMLInputElement;
    this.charCount2 = target.value.length;
  }

  navigateToPreview() {
    this.router.navigate([Link.PreviewBusinessOwnerProfile]);
  }
}
