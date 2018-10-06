import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { SeeRoutingModule } from './see-routing.module';
import { AdminModule } from './admin/admin.module';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SeeMaterialModule } from './see-material.module';
import { SeeComponent } from './see.component';
import { StudyModule } from './study/study.module';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    SeeComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    SeeMaterialModule,
    SeeRoutingModule,
    SharedModule,
    AdminModule,
    StudyModule
  ],
  providers: [],
  bootstrap: [SeeComponent]
})
export class SeeModule { }
