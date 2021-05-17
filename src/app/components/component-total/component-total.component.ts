import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ReqReport, ResReport } from 'src/app/interface-api/interface-report';
import { ServiceApiService } from 'src/app/service/service-api.service';
import { ServiceLoginService } from 'src/app/service/service-login.service';
import { NgbCalendar, NgbDateAdapter, NgbDateParserFormatter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import * as moment from 'moment';
import { NgBroadcasterService } from 'ngx-broadcaster';
declare var $: any;

@Component({
  selector: 'app-component-total',
  templateUrl: './component-total.component.html',
  styleUrls: ['./component-total.component.scss']
})
export class ComponentTotalComponent implements OnInit {

  ngPang = {
    perPage: 10,
    Pang: 1,
    total: 100,
  };

  DataReport: ResReport;

  constructor(
    private callApi: ServiceApiService,
    private router: Router,
    private serviceLogin: ServiceLoginService,
    private broadcaster: NgBroadcasterService
  ) { }

  ngOnInit(): void {
        this.getReport();
  }

  getReport() {
    const body: ReqReport = {
      perPage: this.ngPang.perPage,
      page: this.ngPang.Pang
    };
    this.callApi.getReport(body).subscribe(
      (res) => {
        this.DataReport = res;
        console.log(`this is Report ${this.DataReport}`);
        this.setPageTotal(this.DataReport.totalPages);
      }
    );
  }

  setPageTotal(totalArg: number) {
    this.ngPang.total = totalArg * 10;
  }

  pageTest() {
    setTimeout(() => {
      const ngPage: SetPage = {
        page: this.ngPang.Pang
      };
      console.log('==========================', ngPage);
      this.getReport();
    }, 5);

  }

}

interface SetPage {
  page: number;
}
