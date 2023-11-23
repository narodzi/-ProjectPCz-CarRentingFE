import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CarApi } from 'src/app/shared/api/car.api';
import { MaterialModule } from 'src/app/shared/modules/material.module';
import { WalletBalanceModalComponent } from 'src/app/user-account/wallet-balance-modal/wallet-balance-modal.component';
import { Car } from 'src/app/shared/models/car.model';
import { CarFormModalModel } from './car-form-modal.model';

export type CarFormModel = FormGroup<{
  _id: FormControl<string | null>
  brand: FormControl<string | null>
  model: FormControl<string | null>
  number_of_seats: FormControl<number | null>
  horse_power: FormControl<number | null>
  gearbox: FormControl<string | null>
  trunk: FormControl<number | null>
  fuel_type: FormControl<string | null>
  number_of_doors: FormControl<number | null>
  color: FormControl<string | null>
  production_year: FormControl<number | null>
  fuel_consumption: FormControl<number | null>
  price: FormControl<number | null>
  available: FormControl<boolean | null>
  image_url: FormControl<string | null>
  type: FormControl<string | null>
}>


@Component({
  selector: 'app-car-form-modal',
  standalone: true,
  imports: [
    CommonModule, MaterialModule, ReactiveFormsModule
  ],
  templateUrl: './car-form-modal.component.html',
  styleUrls: ['./car-form-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CarFormModalComponent {

  mode = 'add'

  constructor(
    public dialogRef: MatDialogRef<WalletBalanceModalComponent>,
    private readonly fb: FormBuilder, private readonly carApi: CarApi,
    @Inject(MAT_DIALOG_DATA) public data: CarFormModalModel
  ) {
    if(data) {
      if(data.car) {
        this.carForm.patchValue(data.car)   
      }
      if(data.mode) {
        this.mode = data.mode
      }
    }
  }

  closeModal(): void {
    this.dialogRef.close();
  }

  readonly gearBoxOptions = ['automatyczna', 'manualna'] //todo change
  readonly fuelTypeOptions = ['benzyna', 'diesel', 'gaz', 'elektryk']//todo change

  readonly carForm: CarFormModel = this.fb.nonNullable.group({
    _id: new FormControl<string | null>(null),
    brand: new FormControl<string | null>(null, Validators.required),
    model: new FormControl<string | null>(null, Validators.required),
    number_of_seats: new FormControl<number | null>(null, Validators.required),
    horse_power: new FormControl<number | null>(null, Validators.required),
    gearbox: new FormControl<string | null>(null, Validators.required),
    trunk: new FormControl<number | null>(null, Validators.required),
    fuel_type: new FormControl<string | null>(null, Validators.required),
    number_of_doors: new FormControl<number | null>(null, Validators.required),
    color: new FormControl<string | null>(null, Validators.required),
    production_year: new FormControl<number | null>(null, Validators.required),
    fuel_consumption: new FormControl<number | null>(null, Validators.required),
    price: new FormControl<number | null>(null, Validators.required),
    available: new FormControl<boolean>(true, Validators.required),
    image_url: new FormControl<string | null>(null),
    type: new FormControl<string | null>(null, Validators.required),
  })

  convertFormToDto(form: CarFormModel): Car {
    const parsedFuelConsumption = Number(form.controls.fuel_consumption.value?.toString().replace(',','.'))

    return {
      brand: form.controls.brand.value,
      model: form.controls.model.value,
      number_of_seats: form.controls.number_of_seats.value,
      horse_power: form.controls.horse_power.value,
      gearbox: form.controls.gearbox.value,
      trunk: form.controls.trunk.value,
      fuel_type: form.controls.fuel_type.value,
      number_of_doors: form.controls.number_of_doors.value,
      color: form.controls.color.value,
      production_year: form.controls.production_year.value,
      fuel_consumption: parsedFuelConsumption,
      price: form.controls.price.value,
      available: form.controls.available.value,
      image_url: form.controls.image_url.value,
      type: form.controls.type.value
    }
  }

  sendForm() {
    this.carForm.markAllAsTouched()
    if(this.carForm.valid) {
      if(this.mode === 'add') {
        this.carApi.addCar(this.convertFormToDto(this.carForm)).subscribe({
          next: () => this.dialogRef.close(true)
        }
        )
      }
      if(this.mode === 'edit') {
        const carId = this.carForm.controls._id.value
        if(carId) {
          this.carApi.updateCar(this.convertFormToDto(this.carForm), carId).subscribe({
            next: () => this.dialogRef.close(true)
          })
        }
      }
    }
  }
 }
