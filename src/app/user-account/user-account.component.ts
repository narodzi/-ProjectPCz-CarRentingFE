import { Component } from '@angular/core';
import { MaterialModule } from '../shared/modules/material.module';
import { CommonModule } from '@angular/common';
import { UserApi } from '../shared/api/user.api';
import { WalletBalanceModalComponent } from './wallet-balance-modal/wallet-balance-modal.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-user-account',
  templateUrl: './user-account.component.html',
  styleUrls: ['./user-account.component.scss'],
  standalone: true,
  imports: [CommonModule, MaterialModule]
})
export class UserAccountComponent {

  user$ = this.userApi.getUserinfoAsUser()

  constructor(public dialog: MatDialog, private readonly userApi: UserApi) {}

  openDialog() {
    const dialogRef = this.dialog.open(WalletBalanceModalComponent);

    dialogRef.afterClosed().subscribe(result => {
      if(result) {        
        this.userApi.addMoneyToWallerasUser(result).subscribe({
          next: () => this.user$ = this.userApi.getUserinfoAsUser()
        })
      }
    })
  }
}
