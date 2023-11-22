import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MaterialModule } from '../shared/modules/material.module';
import { UserApi } from '../shared/api/user.api';
import { UserTableComponent } from './user-table/user-table.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  standalone: true,
  imports: [CommonModule, MaterialModule, UserTableComponent]
})
export class UsersComponent {

  users$ = this.userApi.getUsers()

  constructor(private readonly userApi: UserApi) {}
}
