import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { User } from 'src/app/shared/models/user.model';
import { MaterialModule } from 'src/app/shared/modules/material.module';

@Component({
  selector: 'app-user-table',
  standalone: true,
  imports: [
    CommonModule,
    MaterialModule
  ],
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserTableComponent { 
  @Input() usersData: User[] | undefined = []
  displayedColumns = ['_id', 'licence_number', 'phone_number', 'wallet_balance']
}
