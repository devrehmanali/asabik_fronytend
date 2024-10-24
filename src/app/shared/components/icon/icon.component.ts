import { Component, Input } from '@angular/core';
import { ChangeDetectionStrategy } from '@angular/core';
import { UniqueIDService } from '../../services/unique-id.service.ts';
import { Icon } from './icon.enum';

// import 'ui-icons/alert.svg';
// import 'ui-icons/close.svg';
// import 'ui-icons/info.svg';
// import 'ui-icons/wallet.svg';
// import 'ui-icons/investor.svg';
// import 'ui-icons/arrow-left.svg';

@Component({
  selector: 'ui-icon',
  host: {
    '[attr.title]': 'ariaTitle',
    '[attr.aria-hidden]': 'ariaHidden',
    '[attr.aria-labelledby]': 'ariaLabelledBy',
    role: 'img',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./icon.component.scss'],
  templateUrl: './icon.component.html',
})
export class IconComponent {
  public ariaHidden: true | null;
  public ariaLabelledBy: string | null;
  public ariaTitle: string | null;

  private _title!: string;
  @Input() public set title(newTitle: string) {
    this._title = newTitle;
    if (this.title && this._title.length > 0) {
      this.ariaHidden = null;
      this.ariaLabelledBy = this.ariaLabelledBy || this.uniqueIDService.next();
      this.ariaTitle = this.title;
    } else {
      this.ariaHidden = true;
      this.ariaLabelledBy = null;
      this.ariaTitle = null;
    }
  }
  public get title() {
    return this._title;
  }

  @Input() type!: Icon;

  private uniqueIDService: UniqueIDService;

  constructor(uniqueIDService: UniqueIDService) {
    this.uniqueIDService = uniqueIDService;

    this.ariaHidden = true;
    this.ariaLabelledBy = null;
    this.ariaTitle = null;
  }
}
