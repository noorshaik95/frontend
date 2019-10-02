import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanActivate, UrlTree} from '@angular/router';

import { LoginService } from './login.service';
import {Observable} from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private loginService: LoginService, private router: Router) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (localStorage.getItem('userToken')) {
      const token = localStorage.getItem('userToken');
      const payload = atob(token.split('.')[1]);
      const payloadResult = JSON.parse(payload);
      if (!(payloadResult.exp > Date.now() / 1000)) {
        localStorage.removeItem('userToken');
        this.router.navigate(['/login']);
        return false;
      } else {
        return true;
      }
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
