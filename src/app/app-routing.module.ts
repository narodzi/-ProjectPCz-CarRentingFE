import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeDashboardComponent } from './home/dashboard/home-dashboard.component';
import { CarDashboardComponent } from './car/dashboard/car-dashboard.component';
import { CarFormComponent } from './car/car-form/car-form.component';
import { UserAccountComponent } from './user-account/user-account.component';
import { UsersComponent } from './users/users.component';
import { HomeAdminDashboardComponent } from './home-admin/dashboard/home-admin-dashboard.component';
import { CarPageComponent } from './car/car-page/car-page.component';

const routes: Routes = [
  { path: 'home', component: HomeDashboardComponent },
  { path: 'home_admin', component: HomeAdminDashboardComponent },
  { path: 'car', component: CarDashboardComponent},
  { path: 'car/form', component: CarFormComponent },
  { path: 'car/:id', component: CarPageComponent },
  { path: 'user_account', component: UserAccountComponent },
  { path: 'users', component: UsersComponent },
  { path: '', pathMatch: 'full', redirectTo: '/home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
