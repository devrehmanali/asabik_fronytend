import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CurrentUserService } from 'src/app/core/services/current-user.service';
import { AlertType } from 'src/app/shared/components/alert/alert.enum';
import { Link } from 'src/app/shared/links.const';
import { AlertService } from 'src/app/shared/services/alert.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-email-comfirmation-page',
  templateUrl: './email-comfirmation-page.component.html',
  styleUrls: ['./email-comfirmation-page.component.scss'],
})
export class EmailComfirmationPageComponent implements OnInit, OnDestroy {
  link = Link;
  subs: Subscription = new Subscription();
  buttonDisabled: boolean = false;
  email: string = '-';

  constructor(
    private userService: UserService,
    private alertService: AlertService,
    private currentUserService: CurrentUserService
  ) {}

  ngOnInit(): void {
    this.subs.add(
      this.currentUserService.getCurrentUser().subscribe((user) => {
        this.email = user?.email || '';
      })
    );
  }

  public sendAgain() {
    this.buttonDisabled = true;
    this.subs.add(
      this.userService.sendConfirmationEmail(this.email).subscribe({
        next: () => {
          this.alertService.push({
            message: 'Email has been sent',
            type: AlertType.Success,
          });
          this.buttonDisabled = false;
        },
        error: (err) => {
          console.error(err);
          this.alertService.push({
            message: err.error.message
              ? err.error.message
              : 'Something went wrong',
            type: AlertType.Danger,
          });
          this.buttonDisabled = false;
        },
      })
    );
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
