import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonColor } from 'src/app/shared/components/button/button-color.enum';

import { InputType } from 'src/app/shared/components/input/input-type.enum';
import { Link } from 'src/app/shared/links.const';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss'],
})
export class WelcomePageComponent implements OnInit {
  constructor(private router: Router) {}
  link = Link;
  inputType = InputType;
  buttonColor = ButtonColor;

  ngOnInit(): void {}

  public login() {}
}
