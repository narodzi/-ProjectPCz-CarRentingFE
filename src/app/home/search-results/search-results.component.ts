import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeDashboardNav } from '../dashboard/home-dasboard.models';
import { MaterialModule } from 'src/app/shared/modules/material.module';
import { ResultCardOutput, SearchResultCardComponent } from '../search-result-card/search-result-card.component';
import { RentalRequest, RentalSearchRequest, RentalSearchResponse } from 'src/app/shared/models/rental.model';
import { RentalApi } from 'src/app/shared/api/rental.api';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';

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
  
  constructor(private readonly rentalApi: RentalApi, private readonly dialog: MatDialog) {}

  handleReservation(cardOutput: ResultCardOutput) {
    const confirmDialog = this.dialog.open(ConfirmDialogComponent, {
      data: { content: `Rezerwujesz ten samochód w terminach: ${this.filters?.start_date} - ${this.filters?.end_date} za kwotę ${cardOutput.price} zł`}
    })

    confirmDialog.afterClosed().subscribe(result => {
      if(result) {
        if(this.filters) {
          const reservation: RentalRequest = {
            car_id: cardOutput.carId,
            start_date: this.filters.start_date,
            end_date: this.filters.end_date
          }
    
          this.rentalApi.addRental(reservation).subscribe({
            next: () => this.takeMeBackToHomePage.emit(HomeDashboardNav.FIRST_TAB)
          })
        }
      }
    })
  }
}
