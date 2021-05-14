import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ComponentQuestionComponent } from './components/component-question/component-question.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ComponentAdminComponent } from './components/component-admin/component-admin.component';
import { ComponentFormComponent } from './components/component-form/component-form.component';
import { ComponentTotalComponent } from './components/component-total/component-total.component';

@NgModule({
  declarations: [
    AppComponent,
    ComponentQuestionComponent,
    DashboardComponent,
    ComponentAdminComponent,
    ComponentFormComponent,
    ComponentTotalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    // FormsModule,
    // ReactiveFormsModule,
    RouterModule,
    // NgbModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
