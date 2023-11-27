import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { UserApi } from '../api/user.api';


@Injectable({
  providedIn: 'root',
})
export class UserActivatedGuard {
  constructor(private readonly userApi: UserApi, public router: Router) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | UrlTree | boolean {

    if(this.userApi.isUserExist === false) {
        return this.router.navigate(['user_account'])
    } else {
      return true;
    }
  }
}