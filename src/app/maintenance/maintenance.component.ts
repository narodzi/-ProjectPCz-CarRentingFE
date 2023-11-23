import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MaintenanceApi } from '../shared/api/maintenance.api';
import { MaintenanceTableComponent } from './maintenance-table/maintenance-table.component';
import { MaterialModule } from '../shared/modules/material.module';

@Component({
  selector: 'app-maintenance',
  standalone: true,
  imports: [
    CommonModule,
    MaterialModule,
    MaintenanceTableComponent
  ],
  templateUrl: './maintenance.component.html',
  styleUrls: ['./maintenance.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class MaintenanceComponent { 

  maintenances$ = this.maintenanceApi.getMaintenances()

  constructor(private readonly maintenanceApi: MaintenanceApi) {}

  handleMaintananceChanged(changed: boolean) {
    if(changed) {
      this.maintenances$ = this.maintenanceApi.getMaintenances()
    }
  }

  handleMaintananceDeleted(maintananceId: string) {
    this.maintenanceApi.deleteMaintenance(maintananceId).subscribe({
      next: () => this.maintenances$ = this.maintenanceApi.getMaintenances()
    })
  }
}
