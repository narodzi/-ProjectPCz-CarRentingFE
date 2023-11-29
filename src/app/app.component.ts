import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { KeycloakService } from './shared/auth/keycloak.service';
import { UserApi } from './shared/api/user.api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private readonly router: Router, private readonly userApi: UserApi) {}

  goToAdminHomePage() {
    this.router.navigate(['home_admin'])
  }

  goToCarPage() {
    this.router.navigate(['car'])
  }

  goToUsersPage() {
    this.router.navigate(['users'])
  }

  goToUserAccount() {
    this.router.navigate(['user_account'])
  }

  goToMaintenance() {
    this.router.navigate(['maintenance'])
  }
  
  goToMain() {
    this.router.navigate(['home'])
  }

  logOut() {
    KeycloakService.logout()
  }
}
