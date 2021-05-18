import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ComponentQuestionComponent } from './components/component-question/component-question.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ComponentAdminComponent } from './components/component-admin/component-admin.component';
import { ComponentFormComponent } from './components/component-form/component-form.component';
import { ComponentTotalComponent } from './components/component-total/component-total.component';
import { ComponentLoginComponent } from './components/component-login/component-login.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { InterceptorInterceptor } from './service/interceptor.interceptor';
import { PipedatethaiPipe } from './pipes/pipedatethai.pipe';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ThankyouComponent } from './components/thankyou/thankyou.component';
import { ComponentChartComponent } from './components/component-chart/component-chart.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { ChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [
    AppComponent,
    ComponentQuestionComponent,
    DashboardComponent,
    ComponentAdminComponent,
    ComponentFormComponent,
    ComponentTotalComponent,
    ComponentLoginComponent,
    PipedatethaiPipe,
    ThankyouComponent,
    ComponentChartComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    HttpClientModule,
    NgbModule,
    NgApexchartsModule,
    ChartsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
