import { Component } from '@angular/core';
import { RentalDto } from '../models/rental.model';
import { MaterialModule } from '../modules/material.module';

@Component({
  selector: 'app-rental-table',
  templateUrl: './rental-table.component.html',
  styleUrls: ['./rental-table.component.scss'],
  standalone: true,
  imports: [MaterialModule]
})
export class RentalTableComponent {
   rentalData: RentalDto[] | undefined = [
    {
      id: "1",
      carId: "car1",
      userId: "user1",
      startDate: "2023-10-01",
      endDate: "2023-10-10",
      priceOverall: 500,
      status: "active",
      penalty: 0
    },
    {
      id: "2",
      carId: "car2",
      userId: "user2",
      startDate: "2023-09-15",
      endDate: "2023-09-20",
      priceOverall: 300,
      status: "closed",
      penalty: 50
    },
    {
      id: "3",
      carId: "car3",
      userId: "user3",
      startDate: "2023-11-05",
      endDate: "2023-11-15",
      priceOverall: 700,
      status: "active",
      penalty: 0
    },
    {
      id: "4",
      carId: "car4",
      userId: "user4",
      startDate: "2023-10-20",
      endDate: "2023-11-05",
      priceOverall: 600,
      status: "active",
      penalty: 0
    },
    {
      id: "5",
      carId: "car5",
      userId: "user5",
      startDate: "2023-09-10",
      endDate: "2023-09-15",
      priceOverall: 250,
      status: "closed",
      penalty: 30
    }
  ]

  displayedColumns = [
    'startDate',
    'endDate',
    'status',
    'priceOverall',
    'actions'
  ]
}
