import { Component, OnInit } from '@angular/core';
import { AlertType } from 'src/app/shared/components/alert/alert.enum';
import { ButtonColor } from 'src/app/shared/components/button/button-color.enum';
import { Icon } from 'src/app/shared/components/icon/icon.enum';
import { RangesResponseGet } from 'src/app/shared/models/ranges-response-get.interface';
import { RangesRowResponse } from 'src/app/shared/models/ranges-row-response.interface';
import { UpdateRatingDto } from 'src/app/shared/models/update-rating-dto.interface';
import { AlertService } from 'src/app/shared/services/alert.service';
import { SettingsService } from 'src/app/shared/services/settings.service';

@Component({
  selector: 'app-rating-update',
  templateUrl: './rating-update.component.html',
  styleUrls: ['./rating-update.component.scss'],
})
export class RatingUpdateComponent implements OnInit {
  yearOneRanges: RangesRowResponse[] = [];
  yearTwoRanges: RangesRowResponse[] = [];
  yearThreeRanges: RangesRowResponse[] = [];
  yearFourRanges: RangesRowResponse[] = [];
  yearFiveRanges: RangesRowResponse[] = [];
  yearRanges: { [key: string]: { buttonColor: ButtonColor; icon: Icon } } = {};
  icon = Icon;
  public currentButtonColor: ButtonColor = ButtonColor.Secondary;
  public currentIcon: Icon = Icon.Save;

  constructor(
    private settingsService: SettingsService,
    private alertService: AlertService
  ) {}

  ngOnInit() {
    this.getRatings();

    // Inicjuj yearRanges
    for (let i = 0; i < 5; i++) {
      const yearKey = 'year' + (i + 1);
      this.yearRanges[yearKey] = {
        buttonColor: ButtonColor.Secondary,
        icon: Icon.Save,
      };
    }
  }

  getRatings() {
    this.settingsService.getRatings().subscribe(
      (data: RangesResponseGet) => {
        this.yearOneRanges = data.yearOne;
        this.yearTwoRanges = data.yearTwo;
        this.yearThreeRanges = data.yearThree;
        this.yearFourRanges = data.yearFour;
        this.yearFiveRanges = data.yearFive;
      },
      (err) => {
        this.alertService.push({
          message: err.error.message,
          type: AlertType.Danger,
        });
      }
    );
  }

  updateButtonColorAndIcon(yearKey: string, success: boolean) {
    if (success) {
      this.yearRanges[yearKey] = {
        buttonColor: ButtonColor.Success,
        icon: Icon.Ok,
      };
    } else {
      this.yearRanges[yearKey] = {
        buttonColor: ButtonColor.Danger,
        icon: Icon.Alert,
      };
    }
  }

  updateRanges(yearIndex: number, yearRanges: RangesRowResponse[]) {
    const yearKey = 'year' + (yearIndex + 1);
    const rangesRowUpdate: RangesRowResponse[] = yearRanges || [];
    const updateRatings: UpdateRatingDto = {
      year: yearIndex + 1,
      rangesRowUpdate: rangesRowUpdate,
    };
    this.settingsService.updateRanges(updateRatings).subscribe(
      () => {
        this.alertService.push({
          message: `Successfully updated the rating for Year ${yearIndex + 1}`,
          type: AlertType.Success,
        });
        this.updateButtonColorAndIcon(yearKey, true);
      },
      (err) => {
        this.alertService.push({
          message: err.error.message,
          type: AlertType.Danger,
        });
        this.updateButtonColorAndIcon(yearKey, false);
      }
    );
  }
}
