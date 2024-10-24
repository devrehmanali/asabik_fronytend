import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Link } from 'src/app/shared/links.const';

@Component({
  selector: 'app-privacy-policy',
  templateUrl: './privacy-policy.component.html',
  styleUrls: ['./privacy-policy.component.scss'],
})
export class PrivacyPolicyPageComponent implements OnInit {
  constructor(private router: Router) {}
  link = Link;

  ngOnInit(): void {}
}
