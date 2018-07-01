import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { SeeMaterialModule } from '../see-material.module';
import { FormsModule } from '@angular/forms';
import { QuestionEditorComponent } from './question-editor/question-editor.component';
import { AdminQuestionSelectorComponent } from './question-selector/admin-question-selector.component';

@NgModule({
  imports: [
    CommonModule,
    SeeMaterialModule,
    FormsModule
  ],
  declarations: [
    AdminComponent,
    QuestionEditorComponent,
    AdminQuestionSelectorComponent,
    ]
})
export class AdminModule { }
