import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { Link } from 'src/app/shared/links.const';
import { CurrentUserService } from '../services/current-user.service';
import { SurveyStatus } from 'src/app/modules/auth/views/survey-status-page/survey-status.enum';
import { Role } from 'src/app/shared/models/role.enum';

@Injectable({ providedIn: 'root' })
export class OnlyActiveUsersGuard implements CanActivate {
  constructor(
    private router: Router,
    private currentUserService: CurrentUserService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.currentUserService.getCurrentUser().pipe(
      map((session) => {
        if (!session?.emailConfirmed) {
          return this.router.parseUrl(Link.EmailComfirmation);
        }

        if (session?.surveyStatus == null) {
          if (session.role == Role.BusinessOwner) {
            return this.router.parseUrl(Link.BusinessSaurvey);
          } else {
            return this.router.parseUrl(Link.Survey);
          }
        }

        if (!session.plaidLink) {
          return this.router.parseUrl(Link.Plaid);
        }

        return true;
      })
    );
  }
}
