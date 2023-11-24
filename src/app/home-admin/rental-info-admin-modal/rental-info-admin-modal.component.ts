import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { RenatalInfoAdminModalModel } from './rental-info-admin-modal.model';
import { Observable } from 'rxjs';
import { Car } from 'src/app/shared/models/car.model';
import { Rental } from 'src/app/shared/models/rental.model';
import { User } from 'src/app/shared/models/user.model';
import { CarApi } from 'src/app/shared/api/car.api';
import { RentalApi } from 'src/app/shared/api/rental.api';
import { UserApi } from 'src/app/shared/api/user.api';
import { MaterialModule } from 'src/app/shared/modules/material.module';
import { WalletBalanceModalComponent } from 'src/app/user-account/wallet-balance-modal/wallet-balance-modal.component';
import { FineModalComponent } from '../fine-modal/fine-modal.component';

@Component({
  selector: 'app-rental-info-admin-modal',
  standalone: true,
  imports: [
    CommonModule,
    MaterialModule
  ],
  templateUrl: './rental-info-admin-modal.component.html',
  styleUrls: ['./rental-info-admin-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RentalInfoAdminModalComponent { 

  car$: Observable<Car>
  rental$: Observable<Rental>
  user$: Observable<User>

  constructor(
    private readonly carApi: CarApi,
    private readonly rentalApi: RentalApi,
    private readonly userApi: UserApi,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<RentalInfoAdminModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: RenatalInfoAdminModalModel
  ) {
    this.car$ = this.carApi.getCar(data.carId)
    this.rental$ = this.rentalApi.getRental(data.rentalId)
    this.user$ = this.userApi.getUser(data.userId)
  }

  closeModal(): void {
    this.dialogRef.close();
  }

  openDialog() {
    this.dialog.open(FineModalComponent)
  }
}
