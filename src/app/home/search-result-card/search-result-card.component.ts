import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/shared/modules/material.module';
import { RentalSearchResponse } from 'src/app/shared/models/rental.model';

export type ResultCardOutput = {
  carId: string
  price: number
}

@Component({
  selector: 'app-search-result-card',
  standalone: true,
  templateUrl: './search-result-card.component.html',
  styleUrls: ['./search-result-card.component.scss'],
  imports: [CommonModule, MaterialModule],
})
export class SearchResultCardComponent {
  @Input() singleResult: RentalSearchResponse | undefined

  @Output() sendChoosenCarId = new EventEmitter<ResultCardOutput>()

  sendCarId() {
    if(this.singleResult) {

      this.sendChoosenCarId.emit({carId: this.singleResult._id!, price: this.singleResult.price_overall!})
    }
  }
}
