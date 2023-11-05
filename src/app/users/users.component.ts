import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MaterialModule } from '../shared/modules/material.module';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  standalone: true,
  imports: [CommonModule, MaterialModule]
})
export class UsersComponent {

}
