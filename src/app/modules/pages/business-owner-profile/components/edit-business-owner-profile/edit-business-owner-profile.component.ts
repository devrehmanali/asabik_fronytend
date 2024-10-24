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
import { returnTermListConst } from 'src/app/modules/auth/views/business-survey-page/consts/return-term-list.const';
import { AlertType } from 'src/app/shared/components/alert/alert.enum';
import { ButtonColor } from 'src/app/shared/components/button/button-color.enum';
import { ButtonType } from 'src/app/shared/components/button/button-type.enum';
import { Icon } from 'src/app/shared/components/icon/icon.enum';
import { InputType } from 'src/app/shared/components/input/input-type.enum';
import { Link } from 'src/app/shared/links.const';
import { BusinessOwnerProfileGetResponse } from 'src/app/shared/models/business-owner-profile-get-response.interface';
import { BusinessOwnerProfileUpdate } from 'src/app/shared/models/business-owner-profile-update.interface';
import { BusinessOwnerProfileService } from 'src/app/shared/services/business-owner-profile.service';
import { AlertService } from 'src/app/shared/services/alert.service';

@Component({
  selector: 'app-edit-business-owner-profile',
  templateUrl: './edit-business-owner-profile.component.html',
  styleUrls: ['./edit-business-owner-profile.component.scss'],
})
export class EditBusinessOwnerProfileComponent {
  charCount1: number = 0;
  maxLength: number = 2400;
  loadingCustomerData: boolean = true;
  subs: Subscription = new Subscription();
  inputType = InputType;
  icon = Icon;
  buttonType = ButtonType;
  buttonColor = ButtonColor;
  businessOwner!: BusinessOwnerProfileGetResponse;
  file?: File | null;
  returnTermList = returnTermListConst;

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
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.refreshProfileData();

    setTimeout(() => {
      this.charCount1 = this.form.get('description')?.value.length || 0;
    }, 500);
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
      })
    );
  }

  onDescriptionChange(fieldName: string, id?: number, event?: any) {
    if (fieldName === 'description') {
      this.charCount1 = this.form.get('description')?.value.length || 0;
    }
  }

  onFileChange(newFile: File | null) {
    this.file = newFile;
  }

  submitData() {
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
      website: this.form.value.website,
      description: this.form.value.description,
    };

    this.form.disable();
    from([this.file])
      .pipe(
        delayWhen((newFile) => {
          if (newFile) {
            return this.businessOwnerProfileService.updateMyProfileImg(newFile);
          } else if (newFile === null && this.businessOwner.imgUrl) {
            return this.businessOwnerProfileService.removeMyProfileImg();
          }
          return of(true);
        }),
        catchError(() => {
          this.alertService.push({
            message: 'Image update failed',
            type: AlertType.Danger,
          });
          return of(true);
        }),
        mergeMap(() =>
          this.businessOwnerProfileService.updateMyProfile(profileData)
        )
        // tap(() => this.closeForm())
      )
      .subscribe({
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

  navigateToPreview() {
    this.router.navigate([Link.PreviewBusinessOwnerProfile]);
  }
}
