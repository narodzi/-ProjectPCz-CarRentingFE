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
  { path: 'user_account', component: UserAccountComponent },
  { path: 'home', canActivate: [UserActivatedGuard], component: HomeDashboardComponent,},
  { path: 'home_admin', canActivate: [UserActivatedGuard], component: HomeAdminDashboardComponent},
  { path: 'car', canActivate: [UserActivatedGuard], component: CarDashboardComponent},
  { path: 'car/form', canActivate: [UserActivatedGuard], component: CarFormComponent},
  { path: 'car/:id', canActivate: [UserActivatedGuard], component: CarPageComponent},
  { path: 'users', canActivate: [UserActivatedGuard] , component: UsersComponent},
  { path: 'maintenance', canActivate: [UserActivatedGuard], component: MaintenanceComponent},
  { path: '**', pathMatch: 'full', redirectTo: '/home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
