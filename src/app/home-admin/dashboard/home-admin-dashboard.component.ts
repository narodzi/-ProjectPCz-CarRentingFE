import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MaterialModule } from '../../shared/modules/material.module';
import { RentalTableComponent } from 'src/app/shared/components/rental-table/rental-table.component';
import { RentalTableMode } from 'src/app/shared/components/rental-table/rental-table.model';
import { RentalApi } from 'src/app/shared/api/rental.api';
import { StatisticsApi } from 'src/app/shared/api/statistics.api';
import type { EChartsOption } from 'echarts';
import { NgxEchartsDirective } from 'ngx-echarts';

@Component({
  selector: 'app-home-admin',
  templateUrl: './home-admin-dashboard.component.html',
  styleUrls: ['./home-admin-dashboard.component.scss'],
  standalone: true,
  imports: [CommonModule, MaterialModule, RentalTableComponent, NgxEchartsDirective],
})
export class HomeAdminDashboardComponent {
  options!: EChartsOption
  RentalTableMode = RentalTableMode
  
  rentals$ = this.rentalApi.getAllRentals()
  overallProfit$ = this.statisticsApi.getOverallProfit()

  constructor(private readonly rentalApi: RentalApi, 
    private readonly statisticsApi: StatisticsApi) {
      this.statisticsApi.getMonthlyProfit().subscribe((resp) => {
        this.options = {
          xAxis: {
            type: 'category',
            data: ["Styczeń", "Luty", "Marzec", "Kwiecień", "Maj", "Czerwiec", "Lipiec", "Sierpień", "Wrzesień", "Październik", "Listopad", "Grudzień"]
          },
          yAxis: {
            type: 'value'
          },
          series: [
            {
              data: resp,
              type: 'line'
            }
          ]
        }
      })
  }

  handleRentalChanged(changed: boolean) {
    if(changed) {
      this.rentals$ = this.rentalApi.getAllRentals()
    }
  }
}
