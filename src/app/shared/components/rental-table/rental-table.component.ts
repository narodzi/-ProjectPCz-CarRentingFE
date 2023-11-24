import { Component, Input } from '@angular/core';
import { Rental } from '../../models/rental.model';
import { MaterialModule } from '../../modules/material.module';
import { MatDialog } from '@angular/material/dialog';
import { RentalInfoModalComponent } from '../../../home/rental-info-modal/rental-info-modal.component';
import { RentalTableMode } from './rental-table.model';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { RentalInfoAdminModalComponent } from 'src/app/home-admin/rental-info-admin-modal/rental-info-admin-modal.component';

@Component({
  selector: 'app-rental-table',
  templateUrl: './rental-table.component.html',
  styleUrls: ['./rental-table.component.scss'],
  standalone: true,
  imports: [CommonModule, MaterialModule]
})
export class RentalTableComponent {
  RentalTableMode = RentalTableMode
  @Input() mode: RentalTableMode = RentalTableMode.USER
  @Input() rentalData: Rental[] = []

  displayedColumnsADMIN = [
    'car_id',
    'user_id',
    'start_date',
    'end_date',
    'is_canceled',
    'price_overall',
    'actions',
    'penalty'
  ]
  displayedColumnsUSER = [
    'start_date',
    'end_date',
    'is_canceled',
    'price_overall',
    'actions'
  ]

  constructor(public dialog: MatDialog, private readonly router: Router) {}

  openDialog(rental: Rental) {
    const dialogRef = this.dialog.open(RentalInfoModalComponent, {
      data: {rentalId: rental._id, carId: rental.car_id},
    });
  }

  openAdminDialog(rental: Rental) {
    const dialogRef = this.dialog.open(RentalInfoAdminModalComponent, {
      data: {rentalId: rental._id, carId: rental.car_id, userId: rental.user_id},
    });
  }
}
