import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MaterialModule } from '../../shared/modules/material.module';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { converStringToIso } from '../../shared/utils/date-time.adapter';
import { CommonModule } from '@angular/common';
import { RentalSearchDto } from 'src/app/shared/models/rental.model';

export type SearchFormModel = FormGroup<{
  startDate: FormControl<string | null>
  endDate: FormControl<string | null>
  carBrand: FormControl<string | null>
  carModel: FormControl<string | null>
  carEarliestProductionYear: FormControl<number | null>
  carGearboxType: FormControl<string | null>
  carFuelType: FormControl<string | null>
  carMinimalHorsePower: FormControl<number | null>
  carSeatNumber: FormControl<number | null>
  carDoorsNumber: FormControl<number | null>
  carColor: FormControl<string | null>
  minimalPrice: FormControl<number | null>
  maximalPrice: FormControl<number | null>
}>

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss'],
  standalone: true,
  imports: [CommonModule, MaterialModule, ReactiveFormsModule]
})
export class SearchFormComponent implements OnInit {

  @Output() sendForm = new EventEmitter<RentalSearchDto>()

  readonly brandOptions = ['Opel', 'Ford', 'Audi', 'Porsche']
  readonly modelOptions = ['Corsa', 'Fiesta', 'A2', 'Cayenne']
  readonly gearBoxOptions = ['automatyczna', 'manualna'] //todo change
  readonly fuelTypeOptions = ['benzyna', 'diesel', 'gaz', 'elektryk']//todo change

  readonly searchForm: SearchFormModel = this.fb.nonNullable.group({
    startDate: new FormControl<string | null>(null, [Validators.required, this.startDateValidator()]),
    endDate: new FormControl<string | null>(null, [Validators.required, this.endDateValidator()]),
    carBrand: new FormControl<string | null>(null),
    carModel: new FormControl<string | null>(null),
    carEarliestProductionYear: new FormControl<number | null>(null, Validators.min(2000)),
    carGearboxType: new FormControl<string | null>(null),
    carFuelType: new FormControl<string | null>(null),
    carMinimalHorsePower: new FormControl<number | null>(null, Validators.min(50)),
    carSeatNumber: new FormControl<number | null>(null, [Validators.min(1), Validators.max(10)]),
    carDoorsNumber: new FormControl<number | null>(null, [Validators.min(2), Validators.max(5)]),
    carColor: new FormControl<string | null>(null),
    minimalPrice: new FormControl<number | null>(null, [Validators.required, Validators.min(1)]),
    maximalPrice: new FormControl<number | null>(null, [Validators.required, Validators.min(1)]),
  }, {
  })



  constructor(private readonly fb: FormBuilder) {}

  ngOnInit() {
  }

  searchClicked() {
    if(this.searchForm.valid) {
      this.sendForm.emit(this.convertFormToDto(this.searchForm))
    }
  }

  convertFormToDto(form: SearchFormModel): RentalSearchDto {
    return {
      startDate: converStringToIso(form.controls.startDate.value) ?? undefined,
      endDate: converStringToIso(form.controls.endDate.value) ?? undefined,
      carBrand: form.controls.carBrand.value,
      carModel: form.controls.carModel.value,
      carEarliestProductionYear: form.controls.carEarliestProductionYear.value,
      carGearboxType: form.controls.carGearboxType.value,
      carFuelType: form.controls.carFuelType.value,
      carMinimalHorsePower: form.controls.carMinimalHorsePower.value,
      carSeatNumber: form.controls.carSeatNumber.value,
      carDoorsNumber: form.controls.carDoorsNumber.value,
      carColor: form.controls.carColor.value,
      maximalPrice: form.controls.maximalPrice.value ?? undefined,
      minimalPrice: form.controls.minimalPrice.value ?? undefined
    }
  }

  startDateValidator(): ValidatorFn {
    return(control: AbstractControl): ValidationErrors | null => {
      if(this.searchForm && this.searchForm.controls.endDate.value) {
        const startDate: Date = new Date(control.value)
        const endDate: Date = new Date(this.searchForm.controls.endDate.value)
  
        if (startDate && endDate) {
          const isRangeValid = (endDate.getTime() - startDate.getTime() > 0);
  
          return isRangeValid ? null : {dateRange:true};
      }
      }

    return null;
    }
  }

  endDateValidator(): ValidatorFn {
    return(control: AbstractControl): ValidationErrors | null => {
      if(this.searchForm && this.searchForm.controls.startDate.value) {
        const startDate: Date = new Date(this.searchForm.controls.startDate.value)
        const endDate: Date = new Date(control.value)
  
        if (startDate && endDate) {
          const isRangeValid = (endDate.getTime() - startDate.getTime() > 0);
  
          return isRangeValid ? null : {dateRange:true};
      }
      }

    return null;
    }
  }
}
