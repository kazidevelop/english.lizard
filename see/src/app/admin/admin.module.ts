import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { SeeMaterialModule } from '../see-material.module';
import { FormsModule } from '@angular/forms';
import { QuestionEditorComponent } from './question-editor/question-editor.component';
import { SharedModule } from '../shared/shared.module';
import { DialogQuestionEditorComponent } from './question-editor/dialog-question-editor.component';

@NgModule({
  imports: [
    CommonModule,
    SeeMaterialModule,
    FormsModule,
    SharedModule
  ],
  declarations: [
    AdminComponent,
    QuestionEditorComponent,
    DialogQuestionEditorComponent
  ],

  entryComponents: [
    DialogQuestionEditorComponent
  ],
})
export class AdminModule { }
