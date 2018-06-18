import { NgModule } from '@angular/core';
import { AdminComponent } from './admin/admin.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { RouterModule, Routes } from '@angular/router';
import { StudyComponent } from './study/study.component';


const seeRoutes: Routes = [
  { path: 'admin', component: AdminComponent },
  {
    path: 'study',
    component: StudyComponent,
    data: { title: 'Study...ing..' }
  },
  {
    path: '',
    redirectTo: '/study',
    pathMatch: 'full'
  },
  { path: '**', component: PageNotFoundComponent }
];


@NgModule({
  imports: [
    RouterModule.forRoot(
      seeRoutes,
      { enableTracing: true } // <-- debugging purposes only
    )
  ],
  exports: [
    RouterModule
  ]
})
export class SeeRoutingModule { }
