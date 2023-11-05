import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MaterialModule } from '../shared/modules/material.module';

@Component({
  selector: 'app-admin-account',
  templateUrl: './admin-account.component.html',
  styleUrls: ['./admin-account.component.scss'],
  standalone: true,
  imports: [CommonModule, MaterialModule]
})
export class AdminAccountComponent {

}
