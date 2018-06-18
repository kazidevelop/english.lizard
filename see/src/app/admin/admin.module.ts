import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { QuestionEditorComponent } from './question-editor/question-editor.component';
import { SeeMaterialModule } from '../see-material.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    SeeMaterialModule,
    // BrowserModule,
    // BrowserAnimationsModule,
    // HttpClientModule,
    FormsModule
    // SeeRoutingModule,
  ],
  declarations: [
    AdminComponent,
    QuestionEditorComponent]
})
export class AdminModule { }
