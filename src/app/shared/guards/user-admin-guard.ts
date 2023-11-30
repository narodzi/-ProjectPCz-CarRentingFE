import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { KeycloakService } from '../keycloak/services/keycloak.service';


@Injectable({
  providedIn: 'root',
})
export class UserAdminGuard {
  constructor(private readonly keycloakService: KeycloakService, public router: Router) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | UrlTree | boolean {

    const isUserAdmin = this.keycloakService.isUserHaveAdminRole()
    if(isUserAdmin) {
        return true
    }
    else {
        this.router.navigate(['home'])
        return false
    }
  }
}