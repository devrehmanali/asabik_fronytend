import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ButtonColor } from 'src/app/shared/components/button/button-color.enum';
import { Icon } from 'src/app/shared/components/icon/icon.enum';
import { Subscription } from 'rxjs';
import { AlertType } from 'src/app/shared/components/alert/alert.enum';
import { AlertService } from 'src/app/shared/services/alert.service';
import { BusinessOwnerProfileService } from 'src/app/shared/services/business-owner-profile.service';
import { BusinessOwnerProfilePreviewGetResponse } from 'src/app/shared/models/business-owner-profile-preview-get-response.interface';

@Component({
  selector: 'app-card-preview-business-owner-profile',
  templateUrl: './card-preview-business-owner-profile.component.html',
  styleUrls: ['./card-preview-business-owner-profile.component.scss'],
})
export class CardPreviewBusinessOwnerProfileComponent {
  icon = Icon;
  buttonColor = ButtonColor;
  loading: boolean = true;
  subs: Subscription = new Subscription();
  @Input() requestIdToInvest: number = -1;
  @Input() businessOwnerProfile!: BusinessOwnerProfilePreviewGetResponse;
  @Input() requiredCapitalTotal: number = 0;
  @Input() imageSource: string = '';
  showMoreDescription: boolean = false;
  showMoreRequestLoanPurpose: boolean = false;
  showMoreHelpIncreaseProfit: boolean = false;

  constructor(
    private businessOwnerProfileService: BusinessOwnerProfileService,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.loading = true;
    this.subs.add(
      this.businessOwnerProfileService.getMyPreviewProfile().subscribe({
        next: (data: BusinessOwnerProfilePreviewGetResponse) => {
          this.loading = false;
          this.businessOwnerProfile = data;
          this.businessOwnerProfile?.imgUrl !== undefined &&
          this.businessOwnerProfile?.imgUrl !== ''
            ? (this.imageSource = this.businessOwnerProfile?.imgUrl)
            : (this.imageSource =
                '../../../../assets/img/default-company-logo.svg');
        },
        error: (err) => {
          console.error(err);
          this.alertService.push({
            message: err.error.message
              ? err.error.message
              : 'Something went wrong',
            type: AlertType.Danger,
          });
        },
      })
    );
  }

  locationHandler() {
    navigator.clipboard.writeText(
      `${this.businessOwnerProfile.city}, ${this.businessOwnerProfile.street}`
    );
    const copiedMesage = document.getElementById('addressCopied');
    if (copiedMesage) {
      copiedMesage!.style.display = 'block';
      setTimeout(() => (copiedMesage!.style.display = 'none'), 2000);
    }
  }

  phoneHandler() {
    navigator.clipboard.writeText(this.businessOwnerProfile.phone!);
    const copiedMesage = document.getElementById('phoneCopied');
    if (copiedMesage) {
      copiedMesage!.style.display = 'block';
      setTimeout(() => (copiedMesage!.style.display = 'none'), 2000);
    }
  }

  websiteHandler() {
    const newTab = window.open(
      `https://${this.businessOwnerProfile.website}`,
      '_blank'
    );
    if (newTab) {
      newTab.focus();
    }
  }

  toggleShowMoreDescription() {
    this.showMoreDescription = !this.showMoreDescription;
  }

  toggleShowMoreLoanPurpose() {
    this.showMoreRequestLoanPurpose = !this.showMoreRequestLoanPurpose;
  }

  toggleShowMoreHelpIncreaseProfit() {
    this.showMoreHelpIncreaseProfit = !this.showMoreHelpIncreaseProfit;
  }

  ngOnDestroy(): void {}
}
