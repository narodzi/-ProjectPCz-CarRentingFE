import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Rental } from '../../models/rental.model';
import { MaterialModule } from '../../modules/material.module';
import { MatDialog } from '@angular/material/dialog';
import { RentalInfoModalComponent } from '../../../home/rental-info-modal/rental-info-modal.component';
import { RentalTableMode } from './rental-table.model';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { RentalInfoAdminModalComponent } from 'src/app/home-admin/rental-info-admin-modal/rental-info-admin-modal.component';
import { getRentalStatus } from '../../utils/date-time.adapter';
import { MatPaginator, MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MyCustomPaginatorIntl } from '../../utils/paginator-translate.service';

@Component({
  selector: 'app-rental-table',
  templateUrl: './rental-table.component.html',
  styleUrls: ['./rental-table.component.scss'],
  standalone: true,
  imports: [CommonModule, MaterialModule, MatPaginatorModule, MatTableModule],
  providers: [{provide: MatPaginatorIntl, useClass: MyCustomPaginatorIntl}]
})
export class RentalTableComponent implements OnInit, AfterViewInit {
  getRentalStatus = getRentalStatus
  RentalTableMode = RentalTableMode
  @Input() mode: RentalTableMode = RentalTableMode.USER
  @Input() rentalData: Rental[] = []

  @Output() changed = new EventEmitter<boolean>()

  displayedColumnsADMIN = [
    'car_id',
    'user_id',
    'start_date',
    'end_date',
    'is_canceled',
    'price_overall',
    'actions'
  ]
  displayedColumnsUSER = [
    'start_date',
    'end_date',
    'is_canceled',
    'price_overall',
    'actions'
  ]

  dataSource!: MatTableDataSource<Rental>

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit() {
    this.dataSource = new MatTableDataSource<Rental>(this.rentalData);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

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

    dialogRef.afterClosed().subscribe(resp => {
      if(resp) {
        this.changed.emit(true)
      }
    })
  }
}
