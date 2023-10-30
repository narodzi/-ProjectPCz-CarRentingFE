import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private readonly router: Router) {}

  goToCarPage() {
    this.router.navigate(['car'])
  }

  goToMain() {
    this.router.navigate(['home'])
  }
}
