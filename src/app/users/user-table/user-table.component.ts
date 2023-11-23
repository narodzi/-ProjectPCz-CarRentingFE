import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';
import { User } from 'src/app/shared/models/user.model';
import { MaterialModule } from 'src/app/shared/modules/material.module';
import { UserFormModalComponent } from '../user-form-modal/user-form-modal.component';

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

  @Output() userChanged = new EventEmitter<boolean>()
  @Output() sendDeleteReq = new EventEmitter<string>()

  constructor(private readonly dialog: MatDialog) {}

  displayedColumns = ['_id', 'licence_number', 'phone_number', 'wallet_balance', 'actions']

  openDeleteModal(user: User) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: { content: `Czy na pewno chcesz usunąć użytkownika ${user._id}?` }
    })

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.sendDeleteReq.emit(user._id ?? undefined)
      }
    })
  }

  openUserModal(user: User) {
    const dialogRef = this.dialog.open(UserFormModalComponent, {
      data: {
        user: user,
        mode: 'edit'
      }
    })

    dialogRef.afterClosed().subscribe(resp => {
      if(resp) {
        this.userChanged.emit(true)
      }
    })
  }

}
