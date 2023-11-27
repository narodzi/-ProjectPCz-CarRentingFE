import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeDashboardComponent } from './home/dashboard/home-dashboard.component';
import { CarDashboardComponent } from './car/dashboard/car-dashboard.component';
import { CarFormComponent } from './car/car-form/car-form.component';
import { UserAccountComponent } from './user-account/user-account.component';
import { UsersComponent } from './users/users.component';
import { HomeAdminDashboardComponent } from './home-admin/dashboard/home-admin-dashboard.component';
import { CarPageComponent } from './car/car-page/car-page.component';
import { MaintenanceComponent } from './maintenance/maintenance.component';
import { UserActivatedGuard } from './shared/guards/user-activated.guard';

const routes: Routes = [
  { path: 'home', component: HomeDashboardComponent, canActivate: [UserActivatedGuard]},
  { path: 'home_admin', component: HomeAdminDashboardComponent, canActivate: [UserActivatedGuard] },
  { path: 'car', component: CarDashboardComponent, canActivate: [UserActivatedGuard]},
  { path: 'car/form', component: CarFormComponent, canActivate: [UserActivatedGuard] },
  { path: 'car/:id', component: CarPageComponent, canActivate: [UserActivatedGuard] },
  { path: 'user_account', component: UserAccountComponent },
  { path: 'users', component: UsersComponent, canActivate: [UserActivatedGuard] },
  { path: 'maintenance', component: MaintenanceComponent, canActivate: [UserActivatedGuard]},
  { path: '', pathMatch: 'full', redirectTo: '/home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
