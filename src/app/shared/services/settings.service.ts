import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { HttpService } from 'src/app/core/http/http.service';
import { GlobalSettingsResponse } from 'src/app/shared/models/global-settings-response-interface';
import { RangesResponseGet } from '../models/ranges-response-get.interface';
import { UpdateRatingDto } from '../models/update-rating-dto.interface';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  private readonly baseUrl = 'global-settings';

  constructor(private httpService: HttpService) {}

  getGlobalSettings(): Observable<GlobalSettingsResponse> {
    return this.httpService.doGet<GlobalSettingsResponse>(
      `admin-data/${this.baseUrl}`
    );
  }

  private getGlobalSettingsOrFail(): Observable<GlobalSettingsResponse> {
    return this.getGlobalSettings();
  }

  updateGlobalSettings(
    updateSettings: GlobalSettingsResponse
  ): Observable<void> {
    return this.getGlobalSettingsOrFail().pipe(
      mergeMap((existingSettings) => {
        if (!existingSettings) {
          throw new Error('Global settings not found.');
        }

        const updatedSettings: GlobalSettingsResponse = {
          ...existingSettings,
          ...updateSettings,
        };

        return this.httpService.doPatch<void>(
          `admin-data/${this.baseUrl}`,
          updatedSettings
        );
      })
    );
  }

  getRatings(): Observable<RangesResponseGet> {
    return this.httpService.doGet<RangesResponseGet>(
      'admin-data/global-settings/ratings'
    );
  }

  updateRanges(updateRatings: UpdateRatingDto): Observable<void> {
    return this.httpService.doPatch<void>(
      `admin-data/${this.baseUrl}/ratings`,
      updateRatings
    );
  }
}
