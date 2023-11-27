import { CommonModule } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CarWithStatus } from 'src/app/shared/models/car.model';
import { MaterialModule } from 'src/app/shared/modules/material.module';
import { MatPaginator, MatPaginatorIntl, MatPaginatorModule} from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule} from '@angular/material/table';
import { MyCustomPaginatorIntl } from 'src/app/shared/utils/paginator-translate.service';

export type CarTableOutput = {
  carId: string
  onoff: boolean
}

@Component({
  selector: 'app-car-table',
  standalone: true,
  templateUrl: './car-table.component.html',
  styleUrls: ['./car-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    MaterialModule,
    MatPaginatorModule, 
    MatTableModule
  ],
  providers: [{provide: MatPaginatorIntl, useClass: MyCustomPaginatorIntl}]
})
export class CarTableComponent implements OnInit, AfterViewInit {
  displayedColumns = ['type', 'brand', 'model', 'fuel_type', 'gearbox', 'production_year', 'price', 'actions']
  
  @Input() carData: CarWithStatus[] | undefined = []
  @Output() sendTableResponse= new EventEmitter<CarTableOutput>()

  dataSource!: MatTableDataSource<CarWithStatus>

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit() {
    this.dataSource = new MatTableDataSource<CarWithStatus>(this.carData);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  constructor(private readonly router: Router) {}

  navigateToDetails(row: CarWithStatus) {
    this.router.navigate(['/car/', row.id])
  }

  disableCar(carId: string) {
    this.sendTableResponse.emit({ carId, onoff: false })
  }

  enableCar(carId: string) {
    this.sendTableResponse.emit({ carId, onoff: true })
  }
}
