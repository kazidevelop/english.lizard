import { NgModule } from '@angular/core';
import {
  MatButtonModule, MatCardModule, MatCheckboxModule,
  MatRadioModule, MatDividerModule, MatProgressBarModule, MatSidenavModule, MatToolbarModule, MatIconModule
} from '@angular/material';
import { CdkTableModule } from '@angular/cdk/table';
import { MatListModule } from '@angular/material/list';
import {MatTabsModule} from '@angular/material/tabs';
import {MatChipsModule} from '@angular/material/chips';
import {MatInputModule} from '@angular/material/input';
import {MatDialogModule} from '@angular/material/dialog';

@NgModule({
  imports: [MatSidenavModule, MatToolbarModule,
    MatButtonModule, MatListModule,
    MatIconModule, MatInputModule, MatCheckboxModule, MatCardModule,
    MatProgressBarModule, MatRadioModule, MatDividerModule, MatTabsModule, MatChipsModule, MatDialogModule],
  exports: [CdkTableModule, MatSidenavModule, MatToolbarModule,
    MatButtonModule, MatListModule, MatIconModule, MatInputModule,
    MatCheckboxModule, MatCardModule,
    MatProgressBarModule, MatRadioModule, MatDividerModule, MatTabsModule, MatChipsModule, MatDialogModule],
})
export class SeeMaterialModule { }


