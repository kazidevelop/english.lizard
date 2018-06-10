import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { QuestionViewerComponent } from './question-viewer/question-viewer.component';
import { SeeMaterialModule } from './see-material.module';
import { SeeComponent } from './see.component';
import { QuestionSelectorComponent } from './question-selector/question-selector.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    SeeComponent,
    QuestionViewerComponent,
    QuestionSelectorComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    SeeMaterialModule
  ],
  providers: [],
  bootstrap: [SeeComponent]
})
export class SeeModule { }
