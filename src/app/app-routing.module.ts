import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CarDashboardComponent } from './car/dashboard/car-dashboard.component';
import { CarFormComponent } from './car/car-form/car-form.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'car', component: CarDashboardComponent},
  { path: 'car/form', component: CarFormComponent },
  { path: '', pathMatch: 'full', redirectTo: '/home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
