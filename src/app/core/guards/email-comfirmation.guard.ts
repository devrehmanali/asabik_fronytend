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

@Injectable({ providedIn: 'root' })
export class EmailComfiramtionGuard implements CanActivate {
  constructor(
    private router: Router,
    private currentUserService: CurrentUserService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.currentUserService.getCurrentUser().pipe(
      map((session) => {
        if (session?.emailConfirmed)
          return this.router.parseUrl(Link.Dashboard);
        return true;
      })
    );
  }
}
