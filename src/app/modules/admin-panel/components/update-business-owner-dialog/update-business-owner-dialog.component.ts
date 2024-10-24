import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { AlertType } from 'src/app/shared/components/alert/alert.enum';
import { BusinessOwnerDetails } from 'src/app/shared/models/business-owner-details.interface';
import { BusinessOwnerProfileUpdate } from 'src/app/shared/models/business-owner-profile-update.interface';
import { AlertService } from 'src/app/shared/services/alert.service';
import { BusinessOwnerService } from 'src/app/shared/services/business-owner.service';

@Component({
  templateUrl: './update-business-owner-dialog.component.html',
  styleUrls: ['./update-business-owner-dialog.component.scss'],
})
export class UpdateBusinessOwnerDialogComponent implements OnInit, OnDestroy {
  form: FormGroup = new FormGroup({
    companyName: new FormControl(null, []),
    ownerName: new FormControl(null, []),
    street: new FormControl(null, []),
    city: new FormControl(null, []),
    zipCode: new FormControl(null, []),
    phone: new FormControl(null, []),
    website: new FormControl(null, []),
    description: new FormControl(null, [Validators.maxLength(255)]),
  });

  subs: Subscription = new Subscription();

  constructor(
    private alertService: AlertService,
    private businessOwnerService: BusinessOwnerService,
    @Inject(MAT_DIALOG_DATA) public data: BusinessOwnerDetails,
    private dialogRef: MatDialogRef<UpdateBusinessOwnerDialogComponent>
  ) {}

  update() {
    this.form.updateValueAndValidity();
    this.form.markAllAsTouched();
    if (this.form.invalid) return;

    let profileData: BusinessOwnerProfileUpdate = {
      companyName: this.form.value.companyName,
      ownerName: this.form.value.ownerName,
      street: this.form.value.street,
      city: this.form.value.city,
      zipCode: this.form.value.zipCode,
      phone: this.form.value.phone,
    };

    this.subs.add(
      this.businessOwnerService
        .updateProfile(this.data.id, profileData)
        .subscribe({
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
  ngOnInit(): void {
    this.form.get('companyName')?.setValue(this.data.companyName);
    this.form.get('ownerName')?.setValue(this.data.ownerName);
    this.form.get('street')?.setValue(this.data.address?.street);
    this.form.get('city')?.setValue(this.data.address?.city);
    this.form.get('zipCode')?.setValue(this.data.address?.zipCode);
    this.form.get('phone')?.setValue(this.data.phoneNumber);
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
