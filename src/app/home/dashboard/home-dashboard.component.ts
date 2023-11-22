import { Component } from '@angular/core';
import { MaterialModule } from '../../shared/modules/material.module';
import { RentalTableComponent } from '../../shared/components/rental-table/rental-table.component';
import { SearchFormComponent } from '../search-form/search-form.component';
import { HomeDashboardNav } from './home-dasboard.models';
import { SearchResultsComponent } from '../search-results/search-results.component';
import { RentalSearchRequest, RentalSearchResponse } from 'src/app/shared/models/rental.model';
import { FilteredApi } from 'src/app/shared/api/filtered.api';

@Component({
  selector: 'app-home',
  templateUrl: './home-dashboard.component.html',
  styleUrls: ['./home-dashboard.component.scss'],
  imports: [MaterialModule, RentalTableComponent, SearchFormComponent, SearchResultsComponent],
  standalone: true
})
export class HomeDashboardComponent {
  HomeDashboardNav = HomeDashboardNav
  selectedIndex = 0

  rentalFilters?: RentalSearchRequest
  rentalSearchResults?: RentalSearchResponse[]
  
  constructor(private readonly filteredApi: FilteredApi) {}

  handleFormFilled(filledFilters: RentalSearchRequest) {
    console.log(filledFilters)
    this.filteredApi.getRentalSearchResults(filledFilters).subscribe({
      next: (resp) => {
        this.rentalFilters = filledFilters
        this.rentalSearchResults = resp
        this.changeTab(HomeDashboardNav.SECOND_TAB)
      }
    })
  }

  changeTab(direction: HomeDashboardNav) {
    this.selectedIndex = direction
  }
}
