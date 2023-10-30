import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarDashboardComponent } from './dashboard/car-dashboard.component';
import { CarFormComponent } from './car-form/car-form.component';
import { MaterialModule } from '../modules/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  declarations: [
    CarDashboardComponent,
    CarFormComponent
  ],
  providers: [
    {provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {appearance: 'outline'}}
  ],
  exports: [
    CarDashboardComponent
  ]
})
export class CarModule { }
