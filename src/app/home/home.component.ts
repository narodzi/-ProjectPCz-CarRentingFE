import { Component } from '@angular/core';
import { MaterialModule } from '../modules/material.module';
import { RentalTableComponent } from '../rental-table/rental-table.component';
import { SearchPanelComponent } from '../search-panel/search-panel.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports: [MaterialModule, RentalTableComponent, SearchPanelComponent],
  standalone: true
})
export class HomeComponent {

}
