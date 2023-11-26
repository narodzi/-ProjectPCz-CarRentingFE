import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Car, CarWithStatus } from 'src/app/shared/models/car.model';
import { MaterialModule } from 'src/app/shared/modules/material.module';

@Component({
  selector: 'app-car-table',
  standalone: true,
  imports: [
    CommonModule,
    MaterialModule
  ],
  templateUrl: './car-table.component.html',
  styleUrls: ['./car-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CarTableComponent {
  @Input() carData: CarWithStatus[] | undefined = []
  displayedColumns = ['type', 'brand', 'model', 'fuel_type', 'gearbox', 'production_year', 'price', 'actions']

  constructor(private readonly router: Router) {}

  handleRowClick(row: Car) {
    this.router.navigate(['/car/', row._id])
  }
}
