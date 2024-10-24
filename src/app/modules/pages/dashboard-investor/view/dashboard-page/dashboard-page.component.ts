import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { CurrentUserService } from 'src/app/core/services/current-user.service';
import { Role } from 'src/app/shared/models/role.enum';

@Component({
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss'],
})
export class DashboardPageComponent implements OnDestroy, OnInit {
  subs: Subscription = new Subscription();
  userRole?: Role;
  role = Role;

  constructor(
    private authService: AuthService,
    private currentUserService: CurrentUserService
  ) {}

  ngOnInit(): void {
    this.subs.add(this.currentUserService.saveTempUser().subscribe());
    this.subs.add(
      this.currentUserService.getCurrentUser().subscribe((currentUser) => {
        this.userRole = currentUser?.role as Role;
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
