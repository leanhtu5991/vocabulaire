import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { AuthenticationService } from './auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';
@Injectable()
export class RoleGuardService implements CanActivate {
  constructor(public auth: AuthenticationService, public router: Router, private jwtHelper: JwtHelperService) {}
  canActivate(route: ActivatedRouteSnapshot): boolean {
    // this will be passed from the route config
    // on the data property
    // const expectedRole = route.data.expectedRole;
    const token = localStorage.getItem('token');
    // decode the token to get its payload
    const tokenPayload = this.jwtHelper.decodeToken();
    // console.log('here',expectedRole);
    if (
      !this.auth.loggedIn() || 
      !this.auth.isAdmin()
    ) {
      this.router.navigate(['']);
      return false;
    }
    return true;
  }
}