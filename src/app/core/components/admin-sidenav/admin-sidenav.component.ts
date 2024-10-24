import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Icon } from 'src/app/shared/components/icon/icon.enum';
import { Link } from 'src/app/shared/links.const';
import { Role } from 'src/app/shared/models/role.enum';
import { Session } from '../../models/session.interface';
import { AuthService } from '../../services/auth.service';
import { CurrentUserService } from '../../services/current-user.service';

@Component({
  selector: 'app-admin-sidenav',
  templateUrl: './admin-sidenav.component.html',
  styleUrls: ['./admin-sidenav.component.scss'],
})
export class AdminSidenavComponent implements OnInit, OnDestroy {
  icon = Icon;
  plaidIconClass = 'plaid-logo';
  Role = Role;
  link = Link;
  subs: Subscription = new Subscription();

  session: Session | null = null;
  constructor(
    private currenbtUserService: CurrentUserService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.subs.add(
      this.currenbtUserService.getCurrentUser().subscribe((data) => {
        this.session = data;
      })
    );
  }

  logout() {
    this.subs.add(this.authService.logout().subscribe());
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
