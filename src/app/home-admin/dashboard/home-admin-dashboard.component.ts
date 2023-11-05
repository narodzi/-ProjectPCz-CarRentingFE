import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MaterialModule } from '../../shared/modules/material.module';
import { RentalTableComponent } from 'src/app/shared/components/rental-table/rental-table.component';
import { RentalTableMode } from 'src/app/shared/components/rental-table/rental-table.model';

@Component({
  selector: 'app-home-admin',
  templateUrl: './home-admin-dashboard.component.html',
  styleUrls: ['./home-admin-dashboard.component.scss'],
  standalone: true,
  imports: [CommonModule, MaterialModule, RentalTableComponent]
})
export class HomeAdminDashboardComponent {
  RentalTableMode = RentalTableMode
}
