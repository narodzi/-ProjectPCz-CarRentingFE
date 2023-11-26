import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MaterialModule } from 'src/app/shared/modules/material.module';
import { RenatalInfoModalModel } from './rental-info-modal.model';
import { CarApi } from 'src/app/shared/api/car.api';
import { RentalApi } from 'src/app/shared/api/rental.api';
import { Observable } from 'rxjs';
import { Car } from 'src/app/shared/models/car.model';
import { Rental } from 'src/app/shared/models/rental.model';

@Component({
  selector: 'app-rental-info-modal',
  templateUrl: './rental-info-modal.component.html',
  styleUrls: ['./rental-info-modal.component.scss'],
  standalone: true,
  imports: [CommonModule, MaterialModule]
})
export class RentalInfoModalComponent {

  rentalId: string

  car$: Observable<Car>
  rental$: Observable<Rental>

  constructor(
    private readonly carApi: CarApi,
    private readonly rentalApi: RentalApi,
    public dialogRef: MatDialogRef<RentalInfoModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: RenatalInfoModalModel,
  ) {
    this.rentalId = data.rentalId
    this.car$ = carApi.getCar(data.carId)
    this.rental$ = rentalApi.getRental(data.rentalId)
  }

  closeModal(): void {
    this.dialogRef.close();
  }

  cancelRental() {
    this.rentalApi.cancelRental(this.rentalId).subscribe({
      next: () => this.dialogRef.close()
    })
  }
}
