import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { UserActivatedService } from '../auth/user-activated.service';


@Injectable({
  providedIn: 'root',
})
export class UserActivatedGuard {
  constructor(private readonly userActivatedService: UserActivatedService, public router: Router) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | UrlTree | boolean {
    if(this.userActivatedService.isUserActivated !== true) {
        return this.router.navigate(['user_account'])
    }

    return true;
  }
}