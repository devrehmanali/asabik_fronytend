import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Icon } from 'src/app/shared/components/icon/icon.enum';
import { BusinessRating } from '../../enums/business-rating.enum';
import { BusinessRatingType } from './business-rating-type.enum';

@Component({
  selector: 'app-business-rating',
  templateUrl: './business-rating.component.html',
  styleUrls: ['./business-rating.component.scss'],
})
export class BusinessRatingComponent implements OnInit, OnDestroy {
  icon = Icon;
  @Input() businessRating!: BusinessRating;
  @Input() type: BusinessRatingType = BusinessRatingType.Text;
  @Input() prefix: string = 'Rating: ';

  ngOnInit(): void {}

  ngOnDestroy(): void {}
}
