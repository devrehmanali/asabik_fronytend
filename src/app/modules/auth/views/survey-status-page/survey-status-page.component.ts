import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Link } from 'src/app/shared/links.const';
import { SurveyStatus } from './survey-status.enum';

@Component({
  selector: 'app-survey-status-page',
  templateUrl: './survey-status-page.component.html',
  styleUrls: ['./survey-status-page.component.scss'],
})
export class SurveyStatusPageComponent implements OnInit, OnDestroy {
  surveyStatus = SurveyStatus;
  currentSurveyStatus: SurveyStatus | null = null;
  subs: Subscription = new Subscription();

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.subs.add(
      this.activatedRoute.queryParams.subscribe(
        (params: { surveyStatus?: SurveyStatus }) => {
          if (params.surveyStatus == undefined) {
            this.navigateToSignIn();
          } else {
            this.currentSurveyStatus = params.surveyStatus;
          }
        }
      )
    );
  }

  navigateToDashboard() {
    this.router.navigate([Link.Dashboard]);
  }

  navigateToSignIn() {
    this.router.navigate([Link.LogIn]);
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
