import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarDashboardComponent } from './dashboard/car-dashboard.component';
import { CarFormComponent } from './car-form/car-form.component';
import { MaterialModule } from '../shared/modules/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { CarTableComponent } from './car-table/car-table.component';
import { CarPageComponent } from './car-page/car-page.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    CarTableComponent,
    CarPageComponent
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
