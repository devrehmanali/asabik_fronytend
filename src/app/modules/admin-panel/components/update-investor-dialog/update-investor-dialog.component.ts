import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { AlertType } from 'src/app/shared/components/alert/alert.enum';
import { InvestorDetails } from 'src/app/shared/models/investor-details.interface';
import { InvestorProfilePatch } from 'src/app/shared/models/investor-profile-patch.interface';
import { AlertService } from 'src/app/shared/services/alert.service';
import { InvestorService } from 'src/app/shared/services/investor.service';

@Component({
  templateUrl: './update-investor-dialog.component.html',
  styleUrls: ['./update-investor-dialog.component.scss'],
})
export class UpdateInvestorDialogComponent implements OnInit, OnDestroy {
  form: FormGroup = new FormGroup({
    companyName: new FormControl(null, []),
    fullName: new FormControl(null, []),
    website: new FormControl(null, []),
  });

  subs: Subscription = new Subscription();

  constructor(
    private alertService: AlertService,
    private investorService: InvestorService,
    @Inject(MAT_DIALOG_DATA) public data: InvestorDetails,
    private dialogRef: MatDialogRef<UpdateInvestorDialogComponent>
  ) {}

  ngOnInit(): void {
    this.form.get('companyName')?.setValue(this.data.companyName);
    this.form.get('fullName')?.setValue(this.data.fullName);
    this.form.get('website')?.setValue(this.data.website);
  }

  save() {
    this.form.updateValueAndValidity();
    this.form.markAllAsTouched();
    if (this.form.invalid) return;

    let profileData: InvestorProfilePatch = {
      fullName: this.form.value.fullName || undefined,
      companyName: this.form.value.companyName || undefined,
      website: this.form.value.website || undefined,
    };

    this.subs.add(
      this.investorService.updateProfile(this.data.id, profileData).subscribe({
        next: () => {
          this.form.markAsUntouched();
          this.form.markAsPristine();
          this.form.enable();
          this.alertService.push({
            message: 'Profile updated',
            type: AlertType.Success,
          });
          this.dialogRef.close(true);
        },
        error: (err) => {
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
      })
    );
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
