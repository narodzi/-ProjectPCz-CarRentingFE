import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { CarApi } from 'src/app/shared/api/car.api';
import { CarFormModalComponent } from '../car-form-modal/car-form-modal.component';
import { CarWithStatus } from 'src/app/shared/models/car.model';
import { CarTableOutput } from '../car-table/car-table.component';

@Component({
  selector: 'app-car',
  templateUrl: './car-dashboard.component.html',
  styleUrls: ['./car-dashboard.component.scss'],
})
export class CarDashboardComponent {
  constructor(private readonly router: Router,
     private readonly route: ActivatedRoute,
     private readonly carApi: CarApi,
     public dialog: MatDialog
     ) {}

  cars$ = this.carApi.getCarsWithStatus()

  goToAddCarPage() {
    this.router.navigate(['form'], { relativeTo: this.route})
  }

  openDialog() {
    const dialogRef = this.dialog.open(CarFormModalComponent, {
      data: { mode: 'add'}
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.cars$ = this.carApi.getCars()
      }
    })
  }

  filterCars(cars: CarWithStatus[], mode?: string) {
    if(mode === 'available') {
      return cars.filter(c => c.status === 'available')
    }
    if(mode === 'off') {
      return cars.filter(c => c.status === 'off')
    }
    if(mode === 'rented') {
      return cars.filter(c => c.status === 'rented')
    }
    return cars
  }

  handleTableResponse(tr: CarTableOutput) {
    if(tr.onoff === true) {
      this.carApi.setCarEnabled(tr.carId).subscribe({
        next: () => this.cars$ = this.carApi.getCarsWithStatus()
      })
    } else {
      this.carApi.setCarDisabled(tr.carId).subscribe({
        next: () => this.cars$ = this.carApi.getCarsWithStatus()
      })
    }
  }
}
