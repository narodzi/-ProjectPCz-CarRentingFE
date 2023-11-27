import { CommonModule } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CarWithStatus } from 'src/app/shared/models/car.model';
import { MaterialModule } from 'src/app/shared/modules/material.module';
import { MatPaginator, MatPaginatorIntl, MatPaginatorModule} from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule} from '@angular/material/table';
import { MyCustomPaginatorIntl } from 'src/app/shared/utils/paginator-translate.service';

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
  @Input() carData: CarWithStatus[] | undefined = []
  displayedColumns = ['type', 'brand', 'model', 'fuel_type', 'gearbox', 'production_year', 'price', 'actions']

  dataSource!: MatTableDataSource<CarWithStatus>

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit() {
    this.dataSource = new MatTableDataSource<CarWithStatus>(this.carData);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  constructor(private readonly router: Router) {}

  handleRowClick(row: CarWithStatus) {
    this.router.navigate(['/car/', row.id])
  }
}
