import { Component } from '@angular/core';
import { MaterialModule } from '../../shared/modules/material.module';
import { RentalTableComponent } from '../../shared/components/rental-table/rental-table.component';
import { SearchFormComponent } from '../search-form/search-form.component';
import { HomeDashboardNav } from './home-dasboard.models';
import { RentalSearchDto } from 'src/app/shared/models/rental.model';

@Component({
  selector: 'app-home',
  templateUrl: './home-dashboard.component.html',
  styleUrls: ['./home-dashboard.component.scss'],
  imports: [MaterialModule, RentalTableComponent, SearchFormComponent],
  standalone: true
})
export class HomeDashboardComponent {
  HomeDashboardNav = HomeDashboardNav
  selectedIndex = 0

  handleFormFilled(filledFilters: RentalSearchDto) {
    console.log(filledFilters)
    this.changeTab(HomeDashboardNav.SECOND_TAB)
  }

  changeTab(direction: HomeDashboardNav) {
    this.selectedIndex = direction
  }
}
