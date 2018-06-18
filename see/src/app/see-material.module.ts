import { NgModule } from '@angular/core';
import {
  MatButtonModule, MatCardModule, MatCheckboxModule,
  MatRadioModule, MatDividerModule, MatProgressBarModule
} from '@angular/material';

@NgModule({
  imports: [MatButtonModule, MatCheckboxModule, MatCardModule, MatProgressBarModule, MatRadioModule, MatDividerModule],
  exports: [MatButtonModule, MatCheckboxModule, MatCardModule, MatProgressBarModule, MatRadioModule, MatDividerModule],
})
export class SeeMaterialModule { }


