import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AlertType } from 'src/app/shared/components/alert/alert.enum';
import { InvestorProfilePatch } from 'src/app/shared/models/investor-profile-patch.interface';
import { AlertService } from 'src/app/shared/services/alert.service';
import { InvestorProfileService } from 'src/app/shared/services/investor-profile.service';
import { ButtonColor } from 'src/app/shared/components/button/button-color.enum';
import { AuthService } from 'src/app/core/services/auth.service';
import { DeleteInvestorModalComponent } from '../delete-investor-modal/delete-investor-modal.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-investor-profile',
  templateUrl: './investor-profile.component.html',
  styleUrls: ['./investor-profile.component.scss'],
})
export class InvestorProfileComponent implements OnInit, OnDestroy {
  loadingCustomerData: boolean = true;
  subs: Subscription = new Subscription();
  buttonColor = ButtonColor;

  form: FormGroup = new FormGroup({
    fullName: new FormControl(null, [Validators.required]),
    email: new FormControl(null, []),
    companyName: new FormControl(null, []),
    website: new FormControl(null, []),
  });

  constructor(
    private investorProfileService: InvestorProfileService,
    private alertService: AlertService,
    private authService: AuthService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.refreshProfileData();
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
      this.investorProfileService.updateMyProfile(profileData).subscribe({
        next: () => {
          this.form.markAsUntouched();
          this.form.markAsPristine();
          this.form.enable();
          this.alertService.push({
            message: 'Profile updated',
            type: AlertType.Success,
          });
          this.refreshProfileData();
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

  openModal(): void {
    const dialogRef = this.dialog.open(DeleteInvestorModalComponent, {
      maxHeight: '100vh',
    });
  }

  refreshProfileData() {
    this.subs.add(
      this.investorProfileService.getMyProfile().subscribe({
        next: (data) => {
          this.form.patchValue({
            fullName: data.fullName,
            email: data.email,
            companyName: data.comapnyName,
            website: data.website,
          });
          this.form.markAsUntouched();
        },
        error: () => {
          this.alertService.push({
            message: 'Something went wrong',
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
