import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { CarDto } from 'src/app/shared/models/car.model';

export type CarFormModel = FormGroup<{
  id: FormControl<string | null>
  brand: FormControl<string | null>
  model: FormControl<string | null>
  numberOfSeats: FormControl<number | null>
  horsePower: FormControl<number | null>
  gearbox: FormControl<string | null>
  trunk: FormControl<number | null>
  fuelType: FormControl<string | null>
  numberOfDoors: FormControl<number | null>
  color: FormControl<string | null>
  productionYear: FormControl<number | null>
  fuelConsumption: FormControl<number | null>
  price: FormControl<number | null>
  //available: FormControl<boolean | null>
  lastServiceDate: FormControl<string | null>
  nextServiceDate: FormControl<string | null>
}>

@Component({
  selector: 'app-car-form',
  templateUrl: './car-form.component.html',
  styleUrls: ['./car-form.component.scss']
})
export class CarFormComponent implements OnInit, OnDestroy {

  readonly gearBoxOptions = ['automatyczna', 'manualna'] //todo change
  readonly fuelTypeOptions = ['benzyna', 'diesel', 'gaz', 'elektryk']//todo change

  readonly carForm: CarFormModel = this.fb.nonNullable.group({
    id: new FormControl<string | null>(null),
    brand: new FormControl<string | null>(null, Validators.required),
    model: new FormControl<string | null>(null, Validators.required),
    numberOfSeats: new FormControl<number | null>(null, Validators.required),
    horsePower: new FormControl<number | null>(null, Validators.required),
    gearbox: new FormControl<string | null>(null, Validators.required),
    trunk: new FormControl<number | null>(null, Validators.required),
    fuelType: new FormControl<string | null>(null, Validators.required),
    numberOfDoors: new FormControl<number | null>(null, Validators.required),
    color: new FormControl<string | null>(null, Validators.required),
    productionYear: new FormControl<number | null>(null, Validators.required),
    fuelConsumption: new FormControl<number | null>(null, Validators.required),
    price: new FormControl<number | null>(null, Validators.required),
    //available: new FormControl<boolean | null>(null, Validators.required),
    lastServiceDate: new FormControl<string | null>(null, Validators.required),
    nextServiceDate: new FormControl<string | null>(null),
  })

  private readonly destroy$ = new Subject<void>()

  constructor(private readonly fb: FormBuilder) {}

  ngOnInit() {
    this.carForm.statusChanges.pipe(takeUntil(this.destroy$)).subscribe(() => {
      if(this.carForm.valid) {
        console.log(this.convertFormToDto(this.carForm))
      }
    })
  }

  convertFormToDto(form: CarFormModel): CarDto {
    return {
      id: form.controls.id.value,
      brand: form.controls.brand.value,
      model: form.controls.model.value,
      numberOfSeats: form.controls.numberOfSeats.value,
      horsePower: form.controls.horsePower.value,
      gearbox: form.controls.gearbox.value,
      trunk: form.controls.trunk.value,
      fuelType: form.controls.fuelType.value,
      numberOfDoors: form.controls.numberOfDoors.value,
      color: form.controls.color.value,
      productionYear: form.controls.productionYear.value,
      fuelConsumption: form.controls.fuelConsumption.value,
      price: form.controls.price.value,
      //available: form.controls.available.value,
      lastServiceDate: form.controls.lastServiceDate.value,
      nextServiceDate: 'todo'
    }
  }

  ngOnDestroy() {
    this.destroy$.next()
    this.destroy$.complete()
  }
}
