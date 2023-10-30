import { Component } from '@angular/core';
import { MaterialModule } from '../modules/material.module';
import { RentalTableComponent } from '../rental-table/rental-table.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports: [MaterialModule, RentalTableComponent],
  standalone: true
})
export class HomeComponent {

}
