import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ComponentAdminComponent } from './components/component-admin/component-admin.component';
import { ComponentFormComponent } from './components/component-form/component-form.component';
import { ComponentQuestionComponent } from './components/component-question/component-question.component';
import { ComponentTotalComponent } from './components/component-total/component-total.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';


const routes: Routes = [
  {
    path: 'question',
    component: ComponentQuestionComponent,
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      {
        path: 'admin',
        component: ComponentAdminComponent
      },
      {
        path: 'form',
        component: ComponentFormComponent,
      },
      {
        path: 'total',
        component: ComponentTotalComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
