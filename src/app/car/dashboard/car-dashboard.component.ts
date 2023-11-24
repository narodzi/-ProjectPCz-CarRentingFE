import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { CarApi } from 'src/app/shared/api/car.api';
import { CarFormModalComponent } from '../car-form-modal/car-form-modal.component';

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

  cars$ = this.carApi.getCars()

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
}
