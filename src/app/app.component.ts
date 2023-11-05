import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private readonly router: Router) {}

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

  goToAdminAccount() {
    this.router.navigate(['admin_account'])
  }

  goToMain() {
    this.router.navigate(['home'])
  }
}
