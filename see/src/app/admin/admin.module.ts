import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { SeeMaterialModule } from '../see-material.module';
import { FormsModule } from '@angular/forms';
import { QuestionEditorComponent } from './question-editor/question-editor.component';
import { SharedModule } from '../shared/shared.module';
import { DialogQuestionEditorComponent } from './question-editor/dialog-question-editor.component';
import { DialogAdminComponent } from './dialog/admin-dialog.component';
import { AdminQuestionSelectorComponent } from './admin-question-selector/admin-question-selector.component';
import { SeeQuestionChoiceComponent } from './question-editor/question-choice.component';
import { SeeQuestionSpellingComponent } from './question-editor/question-spelling.component';

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
    AdminQuestionSelectorComponent,
    SeeQuestionChoiceComponent,
    SeeQuestionSpellingComponent
  ],

  entryComponents: [
    DialogQuestionEditorComponent,
    DialogAdminComponent,
    AdminQuestionSelectorComponent
  ],
})
export class AdminModule { }
