import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  UrlTree,
} from '@angular/router';
import { Observable, map, of } from 'rxjs';
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

    return this.userApi.checkIfMongoExist().pipe(map(resp => {
      if(resp === true) {
        return true
      }
      this.router.navigate(['user_account'])
      return false
    }))
  }
}