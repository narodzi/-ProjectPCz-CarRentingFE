import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MaterialModule } from '../shared/modules/material.module';
import { UserApi } from '../shared/api/user.api';
import { UserTableComponent } from './user-table/user-table.component';
import { MatDialog } from '@angular/material/dialog';
import { UserFormModalComponent } from './user-form-modal/user-form-modal.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  standalone: true,
  imports: [CommonModule, MaterialModule, UserTableComponent]
})
export class UsersComponent {

  users$ = this.userApi.getUsers()

  constructor(public readonly dialog: MatDialog, private readonly userApi: UserApi) {}

  handleDeleteUser(userId: string) {
    this.userApi.deleteUser(userId).subscribe({
      next: () => this.users$ = this.userApi.getUsers()
    })
  }

  handleUserChanged(changed: boolean) {
    if(changed) {
      this.users$ = this.userApi.getUsers()
    }
  }

  openDialog() {
    const dialogRef = this.dialog.open(UserFormModalComponent, {
      data: { mode: 'add'}
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.users$ = this.userApi.getUsers()
      }
    })
  }
}
