import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';

import {AuthenticationService} from '../services/authentication.service';
import {User} from '../../@shared/models/user.model';

// @ts-ignore
import accountJson from '../mocks/data-seed/account.json';


@Injectable({providedIn: 'root'})
export class UserAuthGuard implements CanActivate {

  router: Router;
  authenticationService: AuthenticationService;
  users: User[] = accountJson;

  constructor(router: Router, authenticationService: AuthenticationService) {
    this.router = router;
    this.authenticationService = authenticationService;
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const currentUser = this.authenticationService.currentUserSubject;

    if (currentUser && currentUser.value && this.isRegister(currentUser.value.username)) {
      return true;
    }

    this.router.navigate(['/account/login'], {queryParams: {returnUrl: state.url}});
    return false;
  }

  isRegister(login: string): boolean {
    const admins = this.users.find(x => x.username === login && x.admin === false);
    return !!admins;
  }
}
