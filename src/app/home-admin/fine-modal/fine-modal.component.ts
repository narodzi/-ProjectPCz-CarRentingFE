import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { UserApi } from 'src/app/shared/api/user.api';
import { MaterialModule } from 'src/app/shared/modules/material.module';

@Component({
  selector: 'app-fine-modal',
  templateUrl: './fine-modal.component.html',
  styleUrls: ['./fine-modal.component.scss'],
  standalone: true,
  imports: [CommonModule, MaterialModule, ReactiveFormsModule]
})
export class FineModalComponent {
  amountControl = new FormControl<number | null>(null, [Validators.required, Validators.min(1)])

  constructor(
    private readonly userApi: UserApi,
    public dialogRef: MatDialogRef<FineModalComponent>,
  ) {
    this.amountControl.valueChanges.subscribe(result => console.log(result))
  }

  closeModal(): void {
    this.dialogRef.close();
  }

  save() {
    this.dialogRef.close(this.amountControl.value);
  }
}
