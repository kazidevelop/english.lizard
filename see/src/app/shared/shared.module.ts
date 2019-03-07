import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SeeMaterialModule } from '../see-material.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    SeeMaterialModule,
    FormsModule
  ]
})
export class SharedModule { }
