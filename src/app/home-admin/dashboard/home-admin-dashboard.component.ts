import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MaterialModule } from '../../shared/modules/material.module';
import { RentalTableComponent } from 'src/app/shared/components/rental-table/rental-table.component';
import { RentalTableMode } from 'src/app/shared/components/rental-table/rental-table.model';
import { RentalApi } from 'src/app/shared/api/rental.api';
import { StatisticsApi } from 'src/app/shared/api/statistics.api';

@Component({
  selector: 'app-home-admin',
  templateUrl: './home-admin-dashboard.component.html',
  styleUrls: ['./home-admin-dashboard.component.scss'],
  standalone: true,
  imports: [CommonModule, MaterialModule, RentalTableComponent]
})
export class HomeAdminDashboardComponent {
  RentalTableMode = RentalTableMode
  
  rentals$ = this.rentalApi.getAllRentals()
  statistics$ = this.statisticsApi.getIncome()

  constructor(private readonly rentalApi: RentalApi, 
    private readonly statisticsApi: StatisticsApi) {}

  handleRentalChanged(changed: boolean) {
    if(changed) {
      this.rentals$ = this.rentalApi.getAllRentals()
    }
  }
}
