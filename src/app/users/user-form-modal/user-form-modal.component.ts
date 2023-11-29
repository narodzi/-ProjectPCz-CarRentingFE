import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MaterialModule } from 'src/app/shared/modules/material.module';
import { UserFormModalModel } from './user-form-modal.model';
import { User } from 'src/app/shared/models/user.model';
import { UserApi } from 'src/app/shared/api/user.api';

export type UserFormModel = FormGroup<{
  licence_number: FormControl<string | null>;
  wallet_balance: FormControl<number | null>;
  country: FormControl<string | null>;
  city: FormControl<string | null>;
  street: FormControl<string | null>;
  postal_code: FormControl<string | null>;
  house_number: FormControl<string | null>;
  apartment_number: FormControl<string | null>;
  phone_number: FormControl<string | null>;
}>;

@Component({
  selector: 'app-user-form-modal',
  standalone: true,
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  templateUrl: './user-form-modal.component.html',
  styleUrls: ['./user-form-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserFormModalComponent { 
  mode = 'add';
  userId!: string

  readonly userForm: UserFormModel = this.fb.nonNullable.group({
    licence_number: new FormControl<string | null>(null, Validators.required),
    wallet_balance: new FormControl<number | null>(null, Validators.required),
    country: new FormControl<string | null>(null, Validators.required),
    city: new FormControl<string | null>(null, Validators.required),
    street: new FormControl<string | null>(null, Validators.required),
    postal_code: new FormControl<string | null>(null, Validators.required),
    house_number: new FormControl<string | null>(null, Validators.required),
    apartment_number: new FormControl<string | null>(null),
    phone_number: new FormControl<string | null>(null, Validators.required),
  });

  constructor(
    public dialogRef: MatDialogRef<UserFormModalComponent>,
    private readonly fb: FormBuilder,
    private readonly userApi: UserApi,
    @Inject(MAT_DIALOG_DATA) public data: UserFormModalModel,
  ) {
    if(data) {
      if(data.user) {
        console.log('hello3')
        if(data.user._id) {
          console.log('hello4')
          this.userId = data.user._id
        }
        this.userForm.patchValue(data.user)
      }
      if(data.mode) {
        this.mode = data.mode
      }
    }
  }

  closeModal(): void {
    this.dialogRef.close();
  }

  convertFormToDto(form: UserFormModel): User {
    return {
      _id: this.userId,
      licence_number: this.userForm.controls.licence_number.value,
      wallet_balance: this.userForm.controls.wallet_balance.value,
      country: this.userForm.controls.country.value,
      city: this.userForm.controls.city.value,
      street: this.userForm.controls.street.value,
      postal_code: this.userForm.controls.postal_code.value,
      house_number: this.userForm.controls.house_number.value,
      apartment_number: this.userForm.controls.apartment_number.value ?? undefined,
      phone_number: this.userForm.controls.phone_number.value
    }
  }

  sendForm() {
    this.userForm.markAllAsTouched()
    if(this.userForm.valid) {
      if(this.mode === 'userInit') {
        this.dialogRef.close(this.convertFormToDto(this.userForm))
      }
      if(this.mode === 'add') {
        this.userApi.addUser(this.convertFormToDto(this.userForm)).subscribe({
          next: () => this.dialogRef.close(true)
        })
      }
      if(this.mode === 'edit') {
        const maintenanceId = this.userId
        if(maintenanceId) {
            this.userApi.updateUser(this.convertFormToDto(this.userForm), maintenanceId).subscribe({
              next: () => this.dialogRef.close(true)
            })
        }
      }
    }
  }
}
