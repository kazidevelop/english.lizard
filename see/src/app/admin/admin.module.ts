import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { SeeMaterialModule } from '../see-material.module';
import { FormsModule } from '@angular/forms';
import { QuestionEditorComponent } from './question-editor/question-editor.component';
import { SharedModule } from '../shared/shared.module';
import { DialogQuestionEditorComponent } from './question-editor/dialog-question-editor.component';
import { DialogAdminComponent } from './dialog/admin-dialog.component';
import { AdminQuestionSelectorComponent } from './question-selector/question-selector.component';

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
    DialogQuestionEditorComponent,
    DialogAdminComponent,
    AdminQuestionSelectorComponent
  ],

  entryComponents: [
    DialogQuestionEditorComponent,
    DialogAdminComponent
  ],
})
export class AdminModule { }
