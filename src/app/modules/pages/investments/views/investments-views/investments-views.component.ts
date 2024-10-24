import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CurrentUserService } from 'src/app/core/services/current-user.service';
import { Role } from 'src/app/shared/models/role.enum';

@Component({
  selector: 'app-investments-views',
  templateUrl: './investments-views.component.html',
  styleUrls: ['./investments-views.component.scss'],
})
export class InvestmentsViewsComponent {
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
