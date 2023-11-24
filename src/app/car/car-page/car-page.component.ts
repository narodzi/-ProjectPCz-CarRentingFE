import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CarApi } from 'src/app/shared/api/car.api';
import { Car } from 'src/app/shared/models/car.model';
import { MaterialModule } from 'src/app/shared/modules/material.module';
import { CarFormModalComponent } from '../car-form-modal/car-form-modal.component';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';
import { MaintenanceFormModalComponent } from 'src/app/maintenance/maintenance-form-modal/maintenance-form-modal.component';
import { MaintenanceTableComponent } from 'src/app/maintenance/maintenance-table/maintenance-table.component';
import { Maintenance } from 'src/app/shared/models/maintenance.model';
import { MaintenanceApi } from 'src/app/shared/api/maintenance.api';

@Component({
  selector: 'app-car-page',
  standalone: true,
  imports: [
    CommonModule,
    MaterialModule,
    MaintenanceTableComponent
  ],
  templateUrl: './car-page.component.html',
  styleUrls: ['./car-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class CarPageComponent { 
  carId: string = ''
  car$: Observable<Car> | undefined
  maintanances$: Observable<Maintenance[]> | undefined

  constructor(private readonly dialog: MatDialog, private readonly route: ActivatedRoute, private readonly router: Router, private readonly carApi: CarApi, private readonly maintananceApi: MaintenanceApi) {
    const carId = this.route.snapshot.paramMap.get('id')
    if(carId) {
      this.carId = carId
      this.car$ = this.carApi.getCar(carId)
      this.maintanances$ = this.maintananceApi.getMaintanancesForCar(carId)
    }
  }

  openDialog(car: Car) {
    const dialogRef = this.dialog.open(CarFormModalComponent, {
      data: {car, mode: 'edit'},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result)
      if(result) {
        this.car$ = this.carApi.getCar(this.carId)
      }
    })
  }

  openDeleteDialog() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {content: "Czy na pewno chcesz usunąć ten samochód?"},
    });
    
    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.carApi.deleteCar(this.carId).subscribe({
          next: () => this.router.navigate(['/car'])
        })
      }
    })
  }

  openMaintenanceDialog() {
    const dialogRef = this.dialog.open(MaintenanceFormModalComponent, {
      data: {
        carID: this.carId,
        mode: 'add'
      }
    })

    dialogRef.afterClosed().subscribe(resp => {
      if(resp) {
        this.handleMaintenancesChanged()
      }
    })
  }

  handleMaintenancesChanged() {
    this.maintanances$ = this.maintananceApi.getMaintanancesForCar(this.carId)
  }

  deleteMaintenance(maintenanceId: string) {
    this.maintananceApi.deleteMaintenance(maintenanceId).subscribe({
      next: () => this.handleMaintenancesChanged()
    })
  }
}
