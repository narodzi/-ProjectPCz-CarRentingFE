import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MaterialModule } from 'src/app/shared/modules/material.module';

@Component({
  selector: 'app-wallet-balance-modal',
  templateUrl: './wallet-balance-modal.component.html',
  styleUrls: ['./wallet-balance-modal.component.scss'],
  standalone: true,
  imports: [CommonModule, MaterialModule, ReactiveFormsModule]
})
export class WalletBalanceModalComponent {
  amountControl = new FormControl<number | null>(null, [Validators.required, Validators.min(1)])

  constructor(
    public dialogRef: MatDialogRef<WalletBalanceModalComponent>,
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
