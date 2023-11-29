import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { KeycloakService } from './shared/auth/keycloak.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  userAdmin: boolean = false
  constructor(private readonly router: Router, private readonly keycloakService: KeycloakService) {
    this.userAdmin = this.keycloakService.isUserHaveAdminRole()
  }

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
