import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MaterialModule } from 'src/app/shared/modules/material.module';
import { RenatalInfoModalModel } from './rental-info-modal.model';
import { CarApi } from 'src/app/shared/api/car.api';
import { RentalApi } from 'src/app/shared/api/rental.api';
import { Observable } from 'rxjs';
import { Car } from 'src/app/shared/models/car.model';
import { Rental } from 'src/app/shared/models/rental.model';
import { getRentalStatus } from 'src/app/shared/utils/date-time.adapter';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-rental-info-modal',
  templateUrl: './rental-info-modal.component.html',
  styleUrls: ['./rental-info-modal.component.scss'],
  standalone: true,
  imports: [CommonModule, MaterialModule]
})
export class RentalInfoModalComponent {
  getRentalStatus = getRentalStatus
  rentalId: string

  car$: Observable<Car>
  rental$: Observable<Rental>

  constructor(
    private readonly carApi: CarApi,
    private readonly rentalApi: RentalApi,
    public dialogRef: MatDialogRef<RentalInfoModalComponent>,
    private readonly dialog: MatDialog,
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
    const confirmDialog = this.dialog.open(ConfirmDialogComponent, {
      data: { content: 'Czy na pewno chcesz anulować wypożyczenie?'}
    })

    confirmDialog.afterClosed().subscribe(resp => {
      if(resp) {
        this.rentalApi.cancelRental(this.rentalId).subscribe({
          next: () => this.dialogRef.close()
        })
      }
    })
  }
}
