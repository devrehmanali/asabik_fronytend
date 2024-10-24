import {
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
  Renderer2,
} from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Icon } from 'src/app/shared/components/icon/icon.enum';
import { Link } from 'src/app/shared/links.const';
import { BusinessOwnerService } from 'src/app/shared/services/business-owner.service';
import { AlertService } from 'src/app/shared/services/alert.service';
import { AlertType } from 'src/app/shared/components/alert/alert.enum';
import * as saveAs from 'file-saver';
import { ButtonColor } from 'src/app/shared/components/button/button-color.enum';

@Component({
  templateUrl: './business-owner-list-page.component.html',
  styleUrls: ['./business-owner-list-page.component.scss'],
})
export class BusinessOwnerListPageComponent implements OnDestroy, OnInit {
  buttonColor = ButtonColor;
  mouseOverStates: Map<number, boolean> = new Map<number, boolean>();
  isMouseOver = false;
  subs: Subscription = new Subscription();
  Icon = Icon;
  Link = Link;
  loading: boolean = false;

  form: FormGroup = new FormGroup({
    search: new FormControl(null, []),
  });

  displayedColumns: string[] = [
    'id',
    'companyName',
    'ownerName',
    'sector',
    'requiredInvestment',
    'isVerified',
    'isActive',
    // 'isBlocked',
  ];

  dataSource = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.paginator.pageSize = 15;
  }

  constructor(
    private alertService: AlertService,
    private businessOwnerService: BusinessOwnerService,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    this.refreshBusinessOwnerList();
  }

  onMouseEnter(elementId: number) {
    this.mouseOverStates.set(elementId, true);
  }

  onMouseLeave(elementId: number) {
    this.mouseOverStates.set(elementId, false);
  }

  async downloadCsv() {
    let csv = this.displayedColumns.join(';') + '\n';
    this.dataSource.data.forEach((investor: any) => {
      this.displayedColumns.forEach((column, i) => {
        if (i == 0) {
          csv += investor[column];
        } else {
          csv += ';' + investor[column];
        }
      });
      csv += '\n';
    });
    const blob = new Blob([csv], {
      type: 'text/plain;charset=utf-8',
    });
    saveAs(blob, 'business-owners.csv');
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  refreshBusinessOwnerList(companyName?: string) {
    this.loading = true;
    this.businessOwnerService.getAllForAdmin(companyName).subscribe({
      next: (data) => {
        this.dataSource.data = data;
        this.loading = false;
      },
      error: (err) => {
        this.alertService.push({
          message: err.error.message,
          type: AlertType.Danger,
        });
        this.loading = false;
      },
    });
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
