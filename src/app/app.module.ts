import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { KeycloakService } from './shared/auth/keycloak.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './shared/auth/authInterceptor';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeDashboardComponent } from './home/dashboard/home-dashboard.component';
import { MaterialModule } from './shared/modules/material.module';
import { CarModule } from './car/car.module';
import { MAT_DATE_LOCALE, MatNativeDateModule } from '@angular/material/core';
import { NgxMatNativeDateModule } from '@angular-material-components/datetime-picker';

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
    NgxMatNativeDateModule
  ],
  providers: [
    KeycloakService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    {
      provide: MAT_DATE_LOCALE,
      useValue: 'pl-PL'
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
