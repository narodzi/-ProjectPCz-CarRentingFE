import { Component } from '@angular/core';
import { MaterialModule } from '../shared/modules/material.module';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-account',
  templateUrl: './user-account.component.html',
  styleUrls: ['./user-account.component.scss'],
  standalone: true,
  imports: [CommonModule, MaterialModule]
})
export class UserAccountComponent {

}
