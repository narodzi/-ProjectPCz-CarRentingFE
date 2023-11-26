import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/shared/modules/material.module';
import { RentalSearchResponse } from 'src/app/shared/models/rental.model';

@Component({
  selector: 'app-search-result-card',
  standalone: true,
  templateUrl: './search-result-card.component.html',
  styleUrls: ['./search-result-card.component.scss'],
  imports: [CommonModule, MaterialModule],
})
export class SearchResultCardComponent {
  @Input() singleResult: RentalSearchResponse | undefined

  @Output() sendChoosenCarId = new EventEmitter<string>()

  sendCarId() {
    if(this.singleResult) {
      this.sendChoosenCarId.emit(this.singleResult._id)
    }
  }
}
