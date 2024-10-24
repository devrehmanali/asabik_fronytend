import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CurrentUserService } from 'src/app/core/services/current-user.service';
import { Role } from 'src/app/shared/models/role.enum';

@Component({
  selector: 'app-monthly-reports-view',
  templateUrl: './monthly-reports-view.component.html',
  styleUrls: ['./monthly-reports-view.component.scss'],
})
export class MonthlyReportsViewComponent {
  role = Role;
  userRole!: Role;
  subs: Subscription = new Subscription();

  constructor(private currentUserService: CurrentUserService) {}
  ngOnInit(): void {
    this.subs.add(
      this.currentUserService.getCurrentUser().subscribe((data) => {
        this.userRole = data?.role as Role;
      })
    );
  }
}
