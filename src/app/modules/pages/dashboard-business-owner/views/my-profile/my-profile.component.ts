import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CurrentUserService } from 'src/app/core/services/current-user.service';
import { Role } from 'src/app/shared/models/role.enum';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss'],
})
export class MyProfilePageComponent implements OnInit {
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
