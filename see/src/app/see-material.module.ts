import { NgModule } from '@angular/core';
import { MatButtonModule, MatCardModule, MatCheckboxModule, MatRadioModule, MatDividerModule } from '@angular/material';

@NgModule({
  imports: [MatButtonModule, MatCheckboxModule, MatCardModule, MatRadioModule, MatDividerModule],
  exports: [MatButtonModule, MatCheckboxModule, MatCardModule, MatRadioModule, MatDividerModule],
})
export class SeeMaterialModule { }


