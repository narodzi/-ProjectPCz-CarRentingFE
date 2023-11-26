import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeDashboardNav } from '../dashboard/home-dasboard.models';
import { MaterialModule } from 'src/app/shared/modules/material.module';
import { SearchResultCardComponent } from '../search-result-card/search-result-card.component';
import { RentalRequest, RentalSearchRequest, RentalSearchResponse } from 'src/app/shared/models/rental.model';
import { RentalApi } from 'src/app/shared/api/rental.api';

@Component({
  selector: 'app-search-results',
  standalone: true,
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss'],
  imports: [CommonModule, MaterialModule, SearchResultCardComponent],
})
export class SearchResultsComponent {
  @Input() rentalSearchResults: RentalSearchResponse[] | undefined = []
  @Input() filters!: RentalSearchRequest | undefined

  @Output() takeMeBackToHomePage = new EventEmitter<HomeDashboardNav>()

  backToHomePage() {
    this.takeMeBackToHomePage.emit(HomeDashboardNav.FIRST_TAB)
  }
  
  constructor(private readonly rentalApi: RentalApi) {}

  handleReservation(carId: string) {
    if(this.filters) {
      const reservation: RentalRequest = {
        car_id: carId,
        start_date: this.filters.start_date,
        end_date: this.filters.end_date
      }

      this.rentalApi.addRental(reservation).subscribe({
        next: () => this.takeMeBackToHomePage.emit(HomeDashboardNav.FIRST_TAB)
      })
    }
  }
}
