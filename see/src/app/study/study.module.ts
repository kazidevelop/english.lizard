import { NgModule } from '@angular/core';

import { QuestionSelectorComponent } from './question-selector/question-selector.component';
import { StudyComponent } from './study.component';
import { QuestionViewerComponent } from './question-viewer/question-viewer.component';
import { QuestionFinishComponent } from './question-viewer/question-finish.component';
import { SeeMaterialModule } from '../see-material.module';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    StudyComponent,
    QuestionViewerComponent,
    QuestionSelectorComponent,
    QuestionFinishComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    SeeMaterialModule
  ]
})
export class StudyModule { }
