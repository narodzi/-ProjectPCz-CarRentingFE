import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CarApi } from 'src/app/shared/api/car.api';
import { Car } from 'src/app/shared/models/car.model';

@Component({
  selector: 'app-car-form',
  templateUrl: './car-form.component.html',
  styleUrls: ['./car-form.component.scss']
})
export class CarFormComponent {
  // readonly gearBoxOptions = ['automatyczna', 'manualna'] //todo change
  // readonly fuelTypeOptions = ['benzyna', 'diesel', 'gaz', 'elektryk']//todo change

  // readonly carForm: CarFormModel = this.fb.nonNullable.group({
  //   id: new FormControl<string | null>(null),
  //   brand: new FormControl<string | null>(null, Validators.required),
  //   model: new FormControl<string | null>(null, Validators.required),
  //   number_of_seats: new FormControl<number | null>(null, Validators.required),
  //   horse_power: new FormControl<number | null>(null, Validators.required),
  //   gearbox: new FormControl<string | null>(null, Validators.required),
  //   trunk: new FormControl<number | null>(null, Validators.required),
  //   fuel_type: new FormControl<string | null>(null, Validators.required),
  //   number_of_doors: new FormControl<number | null>(null, Validators.required),
  //   color: new FormControl<string | null>(null, Validators.required),
  //   production_year: new FormControl<number | null>(null, Validators.required),
  //   fuel_consumption: new FormControl<number | null>(null, Validators.required),
  //   price: new FormControl<number | null>(null, Validators.required),
  //   available: new FormControl<boolean | null>(null, Validators.required),
  //   image_url: new FormControl<string | null>(null),
  //   type: new FormControl<string | null>(null, Validators.required),
  // })

  // constructor(private readonly fb: FormBuilder, private readonly carApi: CarApi) {}

  // convertFormToDto(form: CarFormModel): Car {
  //   return {
  //     _id: form.controls.id.value,
  //     brand: form.controls.brand.value,
  //     model: form.controls.model.value,
  //     number_of_seats: form.controls.number_of_seats.value,
  //     horse_power: form.controls.horse_power.value,
  //     gearbox: form.controls.gearbox.value,
  //     trunk: form.controls.trunk.value,
  //     fuel_type: form.controls.fuel_type.value,
  //     number_of_doors: form.controls.number_of_doors.value,
  //     color: form.controls.color.value,
  //     production_year: form.controls.production_year.value,
  //     fuel_consumption: form.controls.fuel_consumption.value,
  //     price: form.controls.price.value,
  //     available: form.controls.available.value,
  //     image_url: form.controls.image_url.value,
  //     type: form.controls.type.value
  //   }
  // }

  // sendForm() {
  //     this.carApi.addCar(this.convertFormToDto(this.carForm)).subscribe()
  // }
}
