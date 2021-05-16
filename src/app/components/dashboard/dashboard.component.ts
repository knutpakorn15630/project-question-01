import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgBroadcasterService } from 'ngx-broadcaster';
import { ReqLogout } from 'src/app/interface-api/interface-Loout';
import { ServiceApiService } from 'src/app/service/service-api.service';
import { ServiceLoginService } from 'src/app/service/service-login.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  data = {
    message: 'ออกจากระบบ'
  };


  constructor(
    private callApi: ServiceApiService,
    private router: Router,
    private serviceLogin: ServiceLoginService,
    private broadcaster: NgBroadcasterService
  ) { }

  ngOnInit(): void {

  }

  // tslint:disable-next-line:use-lifecycle-interface
  ngOnDestroy(): void {

  }
  testBroadcaster() {
    this.broadcaster.emitEvent('test-event', this.data);
    this.router.navigateByUrl('login');
  }

  Logout() {
    const body: ReqLogout = {
      refreshToken: this.serviceLogin.Token().refreshToken
    };
    this.callApi.getLogOut(body).subscribe(
      (res) => {
        this.broadcaster.emitEvent('token-logout', this.data);
        console.log(`Logout ${res.text}`);
        this.serviceLogin.clearLogin();
        this.router.navigateByUrl('login');
      }
    );
  }
}
