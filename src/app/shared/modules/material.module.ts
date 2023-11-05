import { NgModule } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select'
import { MatTableModule } from '@angular/material/table'
import { MatDatepickerModule } from '@angular/material/datepicker'
import { NgxMatDatetimePickerModule, NgxMatTimepickerModule } from '@angular-material-components/datetime-picker';
import { MatExpansionModule } from '@angular/material/expansion'
import { MatDialogModule } from '@angular/material/dialog'
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  imports: [NgxMatDatetimePickerModule,
    NgxMatTimepickerModule,
    MatToolbarModule,
    MatCardModule,
    MatGridListModule,
    MatButtonModule,
    MatTabsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTableModule,
    MatDatepickerModule,
    MatExpansionModule,
    MatDialogModule,
    MatIconModule
  ],
  exports: [NgxMatDatetimePickerModule,
    NgxMatTimepickerModule,
    MatToolbarModule,
    MatCardModule,
    MatGridListModule,
    MatButtonModule,
    MatTabsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTableModule,
    MatDatepickerModule,
    MatExpansionModule,
    MatDialogModule,
    MatIconModule
  ],
})
export class MaterialModule {}
