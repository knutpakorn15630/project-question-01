import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgBroadcasterService } from 'ngx-broadcaster';
import { Subscription } from 'rxjs';
import { ReqRefreshToken } from './interface-api/interface-refreshToken';
import { ServiceApiService } from './service/service-api.service';
import { ServiceLoginService } from './service/service-login.service';
import jwt_decode from 'jwt-decode';
import * as moment from 'moment';
import { ReqReport, ResReport } from './interface-api/interface-report';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'project-question';
  tokenLogin: Subscription;
  intervalTime: any;
  tokenLogout: Subscription;
  DataReport: ResReport;
  ngPang = {
    perPage: 10,
    Pang: 1,
    total: 100,
  };
  constructor(
    private callApi: ServiceApiService,
    private router: Router,
    private serviceLogin: ServiceLoginService,
    private broadcaster: NgBroadcasterService
  ) { }

  // tslint:disable-next-line:use-lifecycle-interface
  ngOnInit(): void {
    this.tokenLogin = this.broadcaster.listen('token-login').subscribe(
      (res) => {
        console.log('เข้า', res);
        this.intervalRefaceTokenStart();
        // this.resetToken(res);
      }
    );

    this.tokenLogout = this.broadcaster.listen('token-logout').subscribe((res) => {
      console.log('token-logout', res);
      this.intervalRefaceTokenClear();
    });
  }

  // tslint:disable-next-line:use-lifecycle-interface
  ngOnDestroy(): void {
    this.tokenLogin.unsubscribe();
    this.tokenLogout.unsubscribe();
  }

  getReport() {
    const body: ReqReport = {
      perPage: this.ngPang.perPage,
      page: this.ngPang.Pang
    };
    this.callApi.getReport(body).subscribe(
      (res) => {
        this.DataReport = res;
        console.log(`this ++++++ ${this.DataReport}`);
      },
      (err) => {
        console.log(`this err ${err}`);
      }
    );
  }

  intervalRefaceTokenStart() {
    console.log('1');
    if (this.intervalTime) {
      console.log('2');
      return;
    }

    this.intervalTime = setInterval(() => {
      console.log('3');
      const loginData = this.serviceLogin.getLogin();
      if (!loginData) {
        console.log('4');
        this.intervalRefaceTokenClear();
      }
      console.log('5');
      const jwt: any = jwt_decode(JSON.stringify(loginData));
      const now = moment();
      const then = moment.unix(jwt.exp).subtract(5, 'minute'); // time - 5m

      console.log('6');
      this.resetToken(loginData.refreshToken);

    }, 1680000);

  }

  resetToken(Token: string) {
    console.log(`reset 1`);
    const loginData = Token;
    console.log(`this loginData ${loginData}`);
    console.log(`reset 2`);
    const body: ReqRefreshToken = {
      refreshToken: loginData,
    };
    console.log(`reset 3`);

    console.log(`this is body ${body}`);
    this.callApi.RefreshToken(body).subscribe(
      (res) => {
        console.log(`reset 4`);
        this.serviceLogin.accessToken(res.accessToken);
        console.log(`this refresh token ${this.serviceLogin.getLogin().accessToken}`);
      },
      (err) => {
        console.log(`reset 5`);
        this.intervalRefaceTokenClear();
      },
    );
  }

  intervalRefaceTokenClear() {
    if (this.intervalTime != null) {
      this.intervalTime = null;
      clearInterval(this.intervalTime);
    }
  }


}
