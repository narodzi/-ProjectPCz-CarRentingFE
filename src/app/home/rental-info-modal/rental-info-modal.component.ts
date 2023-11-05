import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MaterialModule } from 'src/app/shared/modules/material.module';
import { RenatalInfoModalModel } from './rental-info-modal.model';

@Component({
  selector: 'app-rental-info-modal',
  templateUrl: './rental-info-modal.component.html',
  styleUrls: ['./rental-info-modal.component.scss'],
  standalone: true,
  imports: [CommonModule, MaterialModule]
})
export class RentalInfoModalComponent {
  constructor(
    public dialogRef: MatDialogRef<RentalInfoModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: RenatalInfoModalModel,
  ) {}

  closeModal(): void {
    this.dialogRef.close();
  }
}
