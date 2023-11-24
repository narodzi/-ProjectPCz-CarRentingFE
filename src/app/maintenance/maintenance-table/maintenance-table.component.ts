import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';
import { Maintenance } from 'src/app/shared/models/maintenance.model';
import { MaterialModule } from 'src/app/shared/modules/material.module';
import { MaintenanceFormModalComponent } from '../maintenance-form-modal/maintenance-form-modal.component';

@Component({
  selector: 'app-maintenance-table',
  standalone: true,
  imports: [
    CommonModule,
    MaterialModule
  ],
  templateUrl: './maintenance-table.component.html',
  styleUrls: ['./maintenance-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaintenanceTableComponent { 
  @Input() maintenancesData: Maintenance[] | undefined = []

  @Output() maintananceChanged = new EventEmitter<boolean>()
  @Output() sendDeleteReq = new EventEmitter<string>()

  constructor(private readonly dialog: MatDialog) {}

  displayedColumns = ['car_id', 'date', 'type', 'description', 'actions']

  openDeleteModal(maintenance: Maintenance) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: { content: `Czy na pewno chcesz usunąć tę konserwację?` }
    })

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.sendDeleteReq.emit(maintenance._id ?? undefined)
      }
    })
  }
  
  openMaintenanceModal(maintenance: Maintenance) {
    const dialogRef = this.dialog.open(MaintenanceFormModalComponent, {
      data: {
        maintenance: maintenance,
        carID: maintenance.car_id,
        mode: 'edit'
      }
    })

    dialogRef.afterClosed().subscribe(resp => {
      if(resp) {
        this.maintananceChanged.emit(true)
      }
    })
  }
}
