import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-car',
  templateUrl: './car-dashboard.component.html',
  styleUrls: ['./car-dashboard.component.scss'],
})
export class CarDashboardComponent {
  constructor(private readonly router: Router, private readonly route: ActivatedRoute) {}

  goToAddCarPage() {
    this.router.navigate(['form'], { relativeTo: this.route})
  }
}
