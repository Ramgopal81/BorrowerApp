import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private _authService: AuthService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this._authService.isUserLoggedin()) {
      // logged in so return true

      return true;
    } else {
      // not logged in so redirect to login page with the return url
      this.router.navigate(['/auth/login'], {
        queryParams: { returnUrl: state.url },
      });
      return false;
    }
  }
}