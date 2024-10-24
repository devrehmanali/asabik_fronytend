import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CurrentUserService } from 'src/app/core/services/current-user.service';
import { Role } from 'src/app/shared/models/role.enum';

@Component({
  selector: 'app-investment-request-view',
  templateUrl: './investment-request-view.component.html',
  styleUrls: ['./investment-request-view.component.scss'],
})
export class InvestmentRequestViewComponent {
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
