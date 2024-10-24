import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Icon } from 'src/app/shared/components/icon/icon.enum';

import { Link } from 'src/app/shared/links.const';

@Component({
  selector: 'app-terms',
  templateUrl: './terms.component.html',
  styleUrls: ['./terms.component.scss'],
})
export class TermsPageComponent implements OnInit {
  constructor(private router: Router) {}
  link = Link;
  icon = Icon;

  ngOnInit(): void {}
}
