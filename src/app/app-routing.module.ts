import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ComponentQuestionComponent } from './components/component-question/component-question.component';


const routes: Routes = [
  {
    path: 'question',
    component: ComponentQuestionComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
