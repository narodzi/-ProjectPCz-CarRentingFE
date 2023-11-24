import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MaintenanceApi } from 'src/app/shared/api/maintenance.api';
import { MaterialModule } from 'src/app/shared/modules/material.module';
import { MaintenanceFormModalModel } from './maintenance-form-modal.model';
import { Maintenance } from 'src/app/shared/models/maintenance.model';

export type MaintenanceFormModel = FormGroup<{
  date: FormControl<string | null>;
  type: FormControl<string | null>;
  description: FormControl<string | null>;
}>;

@Component({
  selector: 'app-maintenance-form-modal',
  standalone: true,
  imports: [CommonModule, MaterialModule, ReactiveFormsModule],
  templateUrl: './maintenance-form-modal.component.html',
  styleUrls: ['./maintenance-form-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class MaintenanceFormModalComponent {
  mode = 'add';
  maintenanceId!: string
  carId!: string

  readonly maintenanceForm: MaintenanceFormModel = this.fb.nonNullable.group({
    date: new FormControl<string | null>(null, Validators.required),
    type: new FormControl<string | null>(null, Validators.required),
    description: new FormControl<string | null>(null, Validators.required),
  });

  constructor(
    public dialogRef: MatDialogRef<MaintenanceFormModalComponent>,
    private readonly fb: FormBuilder,
    private readonly maintenanceApi: MaintenanceApi,
    @Inject(MAT_DIALOG_DATA) public data: MaintenanceFormModalModel,
  ) {
    if(data) {
      if(data.maintenance) {
        if(data.maintenance._id) {
          this.maintenanceId = data.maintenance._id
        }
        this.maintenanceForm.patchValue(data.maintenance)
      }
      if(data.mode) {
        this.mode = data.mode
      }
      if(data.carID) {
        this.carId = data.carID
      }
    }
  }

  closeModal(): void {
    this.dialogRef.close();
  }

  convertFormToDto(form: MaintenanceFormModel): Maintenance {
    return {
      _id: this.maintenanceId,
      car_id: this.carId,
      date: form.controls.date.value,
      type: form.controls.type.value,
      description: form.controls.description.value,
    }
  }

  sendForm() {
    this.maintenanceForm.markAllAsTouched()
    if(this.maintenanceForm.valid) {
      if(this.mode === 'add') {
        this.maintenanceApi.addMaintenance(this.convertFormToDto(this.maintenanceForm)).subscribe({
          next: () => this.dialogRef.close(true)
        })
      }
      if(this.mode === 'edit') {
        const maintenanceId = this.maintenanceId
        if(maintenanceId) {
            this.maintenanceApi.updateMaintenance(this.convertFormToDto(this.maintenanceForm), maintenanceId).subscribe({
              next: () => this.dialogRef.close(true)
            })
        }
      }
    }
  }
}
