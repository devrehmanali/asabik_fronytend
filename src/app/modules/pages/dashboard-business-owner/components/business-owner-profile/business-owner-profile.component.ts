import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Icon } from 'src/app/shared/components/icon/icon.enum';
import { Link } from 'src/app/shared/links.const';
import { Role } from 'src/app/shared/models/role.enum';
import { Router } from '@angular/router';
import { BusinessOwnerProfileService } from 'src/app/shared/services/business-owner-profile.service';
import { BusinessOwnerAlertsResponse } from 'src/app/shared/models/business-owner-alerts-response.interface';
import { AlertType } from 'src/app/shared/components/alert/alert.enum';
import { AlertService } from 'src/app/shared/services/alert.service';

declare var Morris: any;

@Component({
  selector: 'app-business-owner-profile',
  templateUrl: './business-owner-profile.component.html',
  styleUrls: ['./business-owner-profile.component.scss'],
})
export class BusinessOwnerProfileComponent implements OnInit, AfterViewInit {
  chartDataAvailable: boolean = false;
  icon = Icon;
  Role = Role;
  link = Link;
  alerts: BusinessOwnerAlertsResponse | null = null;

  constructor(
    private router: Router,
    private businessOwnerProfileService: BusinessOwnerProfileService,
    private alertService: AlertService
  ) {}

  ngOnInit() {
    this.businessOwnerProfileService.getBusinessOwnerAlerts().subscribe(
      (data) => {
        this.alerts = data;
      },
      (err) => {
        if (err.error.message && err.error.message.trim() !== '') {
          this.alertService.push({
            message: err.error.message,
            type: AlertType.Danger,
          });
        }
      }
    );
  }

  navigateToPreview() {
    this.router.navigate([Link.PreviewBusinessOwnerProfile]);
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.businessOwnerProfileService.getMonthlyReportChartData().subscribe(
        (data) => {
          const areAllNull = data.every(
            (point) =>
              point.reportDateAsX === null &&
              point.inflowAsY === null &&
              point.outflowAsY === null
          );

          if (!areAllNull) {
            this.chartDataAvailable = true;
            var chartData = data.map((point) => ({
              y: point.reportDateAsX,
              a: point.inflowAsY,
              b: point.outflowAsY,
            }));

            var config: any = {
              data: chartData,
              xkey: 'y',
              ykeys: ['a', 'b'],
              labels: ['Influences', 'Expenses'],
              fillOpacity: 0.1,
              hideHover: 'auto',
              behaveLikeLine: true,
              resize: true,
              pointFillColors: ['#ffffff'],
              pointSize: 3,
              pointStrokeColors: ['black'],
              lineColors: ['#fb9746', '#163f7b'],
            };

            config.element = 'line-chart';
            Morris.Line(config);
          }
        },
        (err) => {
          if (err.error.message && err.error.message.trim() !== '') {
            this.alertService.push({
              message: err.error.message,
              type: AlertType.Danger,
            });
          }
        }
      );
    }, 100);
  }
}
