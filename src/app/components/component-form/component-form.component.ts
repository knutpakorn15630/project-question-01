import { Component, OnInit } from '@angular/core';
import { ReqShowForm, ResShowForm } from 'src/app/interface-api/interface-from';
import { ServiceApiService } from 'src/app/service/service-api.service';
declare var $: any;

@Component({
  selector: 'app-component-form',
  templateUrl: './component-form.component.html',
  styleUrls: ['./component-form.component.scss']
})
export class ComponentFormComponent implements OnInit {
  DataMainForm: ResShowForm = null;
  ngPang = {
    perPage: 10,
    Pang: 1,
    total: 100,
  };

  constructor(private callApi: ServiceApiService) { }

  ngOnInit(): void {
    this.getShowForm();
  }

  getShowForm() {
    const body: ReqShowForm = {
      perPage: this.ngPang.perPage,
      page: this.ngPang.Pang
    };
    this.callApi.GetMainForm(body).subscribe(
      (res) => {
        this.DataMainForm = res;
        this.setPageTotal(res.totalPages);
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
      this.getShowForm();
    }, 5);

  }


}

interface SetPage {
  page: number;
}
