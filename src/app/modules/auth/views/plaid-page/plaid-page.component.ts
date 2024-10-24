import { Component } from '@angular/core';
import { PlaidService } from 'src/app/core/services/plaid.service';

@Component({
  selector: 'app-plaid-page',
  templateUrl: './plaid-page.component.html',
  styleUrls: ['./plaid-page.component.scss'],
})
export class PlaidPageComponent {
  linkToken: string = '';

  constructor(private plaidService: PlaidService) {}
}
