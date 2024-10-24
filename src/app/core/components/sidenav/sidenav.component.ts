import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { Subscription, mergeMap } from 'rxjs';
import { Icon } from 'src/app/shared/components/icon/icon.enum';
import { Link } from 'src/app/shared/links.const';
import { Role } from 'src/app/shared/models/role.enum';
import { Session } from '../../models/session.interface';
import { AuthService } from '../../services/auth.service';
import { CurrentUserService } from '../../services/current-user.service';
import { BusinessOwnerProfileService } from 'src/app/shared/services/business-owner-profile.service';
import { BusinessOwnerAlertsResponse } from 'src/app/shared/models/business-owner-alerts-response.interface';
import { AlertType } from 'src/app/shared/components/alert/alert.enum';
import { AlertService } from 'src/app/shared/services/alert.service';
import { Router, NavigationEnd } from '@angular/router';
import { PlaidService } from '../../services/plaid.service';
import { InvestorProfileGetResponse } from 'src/app/shared/models/investor-profile-get-response.interface';
import { InvestorProfileService } from 'src/app/shared/services/investor-profile.service';
@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
})
export class SidenavComponent implements OnInit, OnDestroy {
  icon = Icon;
  Role = Role;
  link = Link;
  @Input() drawer!: MatDrawer;
  subs: Subscription = new Subscription();
  alerts: BusinessOwnerAlertsResponse | null = null;
  investor_profile: InvestorProfileGetResponse | null = null;
  session: Session | null = null;

  constructor(
    private currentUserService: CurrentUserService,
    private authService: AuthService,
    private businessOwnerProfileService: BusinessOwnerProfileService,
    private investorProfileService: InvestorProfileService,
    private alertService: AlertService,
    private router: Router,
    private plaidService: PlaidService
  ) {}

  ngOnInit(): void {
    this.subs.add(
      this.currentUserService.getCurrentUser().subscribe((data) => {
        this.session = data;
      })
    );

    this.businessOwnerProfileService.getBusinessOwnerAlerts().subscribe(
      (data) => {
        this.alerts = data;
      },
      (err) => {
        this.alertService.push({
          message: err.error.message,
          type: AlertType.Danger,
        });
      }
    );

    this.investorProfileService.getMyProfile().subscribe((data) => {
      this.investor_profile = data;
    });
  }

  onIdentityVerificationLinkClick(): void {
    this.plaidService.getIdentityVerificationLinkToken().subscribe(
      (data: any) => {
        window.open(data, '_blank');
      },
      (err) => {
        console.error('Error fetching Identity Verification Link:', err);
      }
    );
  }

  logout(): void {
    this.drawer.toggle();
    this.subs.add(this.authService.logout().subscribe());
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
