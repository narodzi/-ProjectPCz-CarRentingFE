import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CarApi } from 'src/app/shared/api/car.api';

@Component({
  selector: 'app-car',
  templateUrl: './car-dashboard.component.html',
  styleUrls: ['./car-dashboard.component.scss'],
})
export class CarDashboardComponent {
  constructor(private readonly router: Router,
     private readonly route: ActivatedRoute,
     private readonly carApi: CarApi) {}

  cars$ = this.carApi.getCars()

  goToAddCarPage() {
    this.router.navigate(['form'], { relativeTo: this.route})
  }
}
