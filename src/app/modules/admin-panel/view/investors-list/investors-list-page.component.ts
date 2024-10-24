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
import { InvestorService } from 'src/app/shared/services/investor.service';
import * as saveAs from 'file-saver';
import { ButtonColor } from 'src/app/shared/components/button/button-color.enum';

@Component({
  templateUrl: './investors-list-page.component.html',
  styleUrls: ['./investors-list-page.component.scss'],
})
export class InvestorsListPageComponent implements OnDestroy, OnInit {
  buttonColor = ButtonColor;
  mouseOverStates: Map<number, boolean> = new Map<number, boolean>();
  isMouseOver = false;
  subs: Subscription = new Subscription();
  Icon = Icon;
  Link = Link;

  form: FormGroup = new FormGroup({
    search: new FormControl(null, []),
  });

  displayedColumns: string[] = [
    'id',
    'fullName',
    'companyName',
    'joined',
    'alreadyInvested',
    'isVerified',
    'isActive',
  ];
  dataSource = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.paginator.pageSize = 15;
  }

  constructor(
    private investorService: InvestorService,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    this.refreshInvestorsList();
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
    saveAs(blob, 'investors.csv');
  }

  refreshInvestorsList() {
    this.subs.add(
      this.investorService.getAllFoAdminPanel().subscribe({
        next: (data) => {
          this.dataSource.data = data;
        },
        error: (err) => {
          console.error(err);
        },
      })
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
