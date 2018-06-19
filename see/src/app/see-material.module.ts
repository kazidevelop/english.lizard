import { NgModule } from '@angular/core';
import {
  MatButtonModule, MatCardModule, MatCheckboxModule,
  MatRadioModule, MatDividerModule, MatProgressBarModule, MatSidenavModule, MatToolbarModule, MatIconModule
} from '@angular/material';
import { CdkTableModule } from '@angular/cdk/table';
import { MatListModule } from '@angular/material/list';

@NgModule({
  imports: [MatSidenavModule, MatToolbarModule,
    MatButtonModule, MatListModule,
    MatIconModule, MatCheckboxModule, MatCardModule,
    MatProgressBarModule, MatRadioModule, MatDividerModule],
  exports: [CdkTableModule, MatSidenavModule, MatToolbarModule,
    MatButtonModule, MatListModule, MatIconModule,
    MatCheckboxModule, MatCardModule,
    MatProgressBarModule, MatRadioModule, MatDividerModule],
})
export class SeeMaterialModule { }


