import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ServiceLogin } from '../interface-api/interface-Login';
import { ServiceLoginService } from '../service/service-login.service';

@Injectable({
  providedIn: 'root'
})
export class GuardLoginGuard implements CanActivate {

  DataTokenTest: ServiceLogin;

  constructor(private router: Router, private serviceLogin: ServiceLoginService) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    this.DataTokenTest = this.serviceLogin.getLogin();
    if (this.DataTokenTest) {
      return true;
    } else {
      console.log('login fail');
      this.router.navigateByUrl('login');
    }
  }

}
