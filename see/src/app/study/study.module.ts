import { NgModule } from '@angular/core';

import { StudyComponent } from './study.component';
import { QuestionViewerComponent } from './question-viewer/question-viewer.component';
import { QuestionFinishComponent } from './question-viewer/question-finish.component';
import { SeeMaterialModule } from '../see-material.module';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    StudyComponent,
    QuestionViewerComponent,
    QuestionFinishComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    SeeMaterialModule,
    SharedModule
  ]
})
export class StudyModule { }
