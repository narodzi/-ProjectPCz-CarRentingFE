import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { KeycloakService } from './shared/keycloak/services/keycloak.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeDashboardComponent } from './home/dashboard/home-dashboard.component';
import { MaterialModule } from './shared/modules/material.module';
import { CarModule } from './car/car.module';
import { MAT_DATE_LOCALE, MatNativeDateModule } from '@angular/material/core';
import { NgxMatNativeDateModule } from '@angular-material-components/datetime-picker';
import { FilteredApi } from './shared/api/filtered.api';
import { CarApi } from './shared/api/car.api';
import { UserApi } from './shared/api/user.api';
import { KeycloakAuthorization } from './shared/keycloak/keycloakAuthrization';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HomeDashboardComponent,
    MaterialModule,
    CarModule,
    MatNativeDateModule,
    NgxMatNativeDateModule,
    HttpClientModule
  ],
  providers: [
    KeycloakService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: KeycloakAuthorization,
      multi: true,
    },
    {
      provide: MAT_DATE_LOCALE,
      useValue: 'pl-PL'
    },
    FilteredApi,
    CarApi,
    UserApi
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
