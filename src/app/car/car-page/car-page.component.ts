import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { CarApi } from 'src/app/shared/api/car.api';
import { Car } from 'src/app/shared/models/car.model';
import { MaterialModule } from 'src/app/shared/modules/material.module';

@Component({
  selector: 'app-car-page',
  standalone: true,
  imports: [
    CommonModule,
    MaterialModule
  ],
  templateUrl: './car-page.component.html',
  styleUrls: ['./car-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CarPageComponent { 
  car$: Observable<Car> | undefined

  constructor(private readonly route: ActivatedRoute, private readonly carApi: CarApi) {
    const carId = this.route.snapshot.paramMap.get('id')
    if(carId) {
      this.car$ = this.carApi.getCar(carId)
    }
  }
}
