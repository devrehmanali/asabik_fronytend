import {
  Component,
  OnDestroy,
  OnInit,
  ElementRef,
  ViewChild,
  AfterViewInit,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { CurrentUserService } from 'src/app/core/services/current-user.service';
import { Icon } from 'src/app/shared/components/icon/icon.enum';
import { UserService } from 'src/app/shared/services/user.service';
import { AlertService } from 'src/app/shared/services/alert.service';
import { RequestsByPurpose } from 'src/app/shared/models/requests-by-purpose.interface';
import { ChartPoint } from 'src/app/shared/models/chart-point.interface';
declare var Morris: any;
declare var Raphael: any;

@Component({
  templateUrl: './admin-dashboard-page.component.html',
  styleUrls: ['./admin-dashboard-page.component.scss'],
})
export class AdminDashboardPageComponent
  implements OnDestroy, OnInit, AfterViewInit
{
  @ViewChild('chart') chartElement!: ElementRef;
  @ViewChild('barChart') barChartElement!: ElementRef;
  chartDataAvailable: boolean = false;
  subs: Subscription = new Subscription();
  numberOfUsers: number = 0;
  numberOfBusinessOwners: number = 0;
  numberOfInvestors: number = 0;
  loading: boolean = false;
  icon = Icon;

  constructor(
    private currentUserService: CurrentUserService,
    private userService: UserService,
    private alertService: AlertService
  ) {}

  /* ---------------------------- NUMBERS OF USERS ---------------------------- */
  createPieChart(): void {
    const pieChartData = [
      { label: 'Business Owners', value: this.numberOfBusinessOwners },
      { label: 'Investors', value: this.numberOfInvestors },
    ];

    new Morris.Donut({
      element: this.chartElement.nativeElement,
      data: pieChartData,
      colors: ['#163f7b', '#fb9746'],
      resize: true,
    });
  }

  /* --------------------------- Requests By Purpose -------------------------- */
  createBarChart(data: RequestsByPurpose[]): void {
    const barChartData = data.map((item) => ({
      y: item.purpose,
      a: item.count,
    }));

    new Morris.Bar({
      element: this.barChartElement.nativeElement,
      data: barChartData,
      xkey: 'y',
      ykeys: ['a'],
      labels: ['Count'],
      barColors: ['#fb9746'],
      resize: true,
      yLabelFormat: (y: number) => {
        if (Number.isInteger(y)) {
          return y.toString();
        } else {
          return '';
        }
      },
    });
  }

  /* ------------------------------- Chart Point ------------------------------ */
  createAreaChart(data: ChartPoint[]): void {
    const areaChartData = data.map((item) => ({
      period: item.reportDateAsX,
      value1: item.inflowAsY,
      value2: item.outflowAsY,
    }));

    new Morris.Area({
      element: 'area-chart',
      data: areaChartData,
      xkey: 'period',
      ykeys: ['value1', 'value2'],
      labels: ['Inflow', 'Outflow'],
      lineColors: ['#163f7b', '#fb9746'],
      lineWidth: 2,
      pointSize: 4,
      hideHover: 'auto',
      resize: true,
    });
  }

  ngOnInit(): void {
    this.subs.add(this.currentUserService.saveTempUser().subscribe());
    this.loading = true;
    this.subs.add(
      this.userService.getUsersInfo().subscribe((data) => {
        this.loading = false;
        this.numberOfInvestors = data.numberOfInvestors;
        this.numberOfBusinessOwners = data.numberOfBusinessOwners;
        this.numberOfUsers = data.numberOfUsers;

        this.createPieChart();
        this.userService
          .getMonthlyReportChartData()
          .subscribe((adminChartsData) => {
            this.createBarChart(adminChartsData.requestsByPurpose);

            this.createAreaChart(
              adminChartsData.businessOwnersMonthlyReports as ChartPoint[]
            );
          });
      })
    );
  }

  ngAfterViewInit(): void {
    // Tutaj możesz zostawić pustą metodę ngAfterViewInit lub przesunąć kod do niej,
    // jeśli masz jakieś konkretne rzeczy, które muszą być zrobione po inicjalizacji widoku
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
