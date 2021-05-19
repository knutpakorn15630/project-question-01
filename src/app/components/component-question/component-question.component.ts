import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgBroadcasterService } from 'ngx-broadcaster';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ReqDataQuestion, ReqMainTitle, ReqOption, ReqTitle, ResDataQuestion, ResShowQuestion } from 'src/app/interface-api/interface-showquestion';
import { ServiceApiService } from 'src/app/service/service-api.service';
import Swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-component-question',
  templateUrl: './component-question.component.html',
  styleUrls: ['./component-question.component.scss']
})


export class ComponentQuestionComponent implements OnInit {

  DataResQuestion: ResShowQuestion = null;
  TotalResQuestion: ResDataQuestion = null;
  CheckRed = false;

  swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success',
      cancelButton: 'btn btn-danger'
    },
    buttonsStyling: false
  });

  data = {
    message: 'ส่งแบบสอบถาม'
  };

  data2 = {
    text: ''
  };

  IsColor = false;

  // tslint:disable-next-line:max-line-length
  constructor(private callApi: ServiceApiService, private router: Router, private broadcaster: NgBroadcasterService, config: NgbModalConfig, private modalService: NgbModal) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit(): void {
    this.ShowDataQuestion();
  }



  selectItem(i1: number, i2: number, i3: number) {
    this.DataResQuestion.maintitle[i1].titles[i2].options.forEach((x, index) => {
      this.DataResQuestion.maintitle[i1].titles[i2].options[index].text = '';
      this.DataResQuestion.maintitle[i1].titles[i2].options[index].isSelect = false;
      this.DataResQuestion.maintitle[i1].titles[i2].options[index].IsColor = false;

    });
    this.DataResQuestion.maintitle[i1].titles[i2].options[i3].isSelect = true;
    this.DataResQuestion.maintitle[i1].titles[i2].options[i3].IsColor = true;
    this.DataResQuestion.maintitle[i1].titles[i2].isCheck = true;
  }

  ShowDataQuestion() {
    this.callApi.showQuestion(1).subscribe(
      (res) => {
        this.DataResQuestion = res;
        // console.log(`this is ----------- ${this.DataResQuestion}`);
      }
    );
  }

  checkIsSelect() {

    this.swalWithBootstrapButtons.fire({
      title: 'เสร็จสิน',
      text: 'You won\'t be able to revert this!',
      icon: 'success',
      showCancelButton: true,
      confirmButtonText: 'ถัดไป',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.swalWithBootstrapButtons.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        );
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        this.swalWithBootstrapButtons.fire(
          'Cancelled',
          'Your imaginary file is safe :)',
          'error'
        );
      }
    });
    // setTimeout(() => {
    //   this.broadcaster.emitEvent('test-even', this.data);
    // }, 500);
  }


  SubmitDataQuestion(test: any) {
    const body: ReqDataQuestion = {
      formId: this.DataResQuestion.id,
      mainTitle: []
    };

    for (const data1 of this.DataResQuestion.maintitle) {
      const mainTitle: ReqMainTitle = {
        id: data1.id,
        titles: []
      };
      for (const data2 of data1.titles) {
        const title: ReqTitle = {
          id: data2.id,
          options: []
        };
        for (const dataOP of data2.options) {
          if (!dataOP.isSelect) {
            continue;
          }
          const option: ReqOption = {
            id: dataOP.id
          };
          title.options.push(option);
        }
        if (title.options.length === 0) {
          Swal.fire({
            icon: 'warning',
            title: 'กรุณาเลือกตัวเลือกให้ครบ!',
            showConfirmButton: false,
            timer: 1000
          });
          this.CheckRed = true;
          return;
        }
        mainTitle.titles.push(title);
      }
      body.mainTitle.push(mainTitle);
    }
    this.callApi.getCheckQuestion(body).subscribe(
      (res) => {
        // console.log('111');
        this.TotalResQuestion = res;
        if (res.mean >= 4.21) {
          this.data2.text = 'มีความสุขมวลรวมในระดับสูงที่สุด';
        } else if (res.mean >= 3.41) {
          this.data2.text = 'มีความสุขมวลรวมในระดับสูง';
        } else if (res.mean >= 2.61) {
          this.data2.text = 'มีความสุขมวลรวมในระดับปานกลาง';
        } else if (res.mean >= 1.81) {
          this.data2.text = 'มีความสุขมวลรวมในระดับต่ำ ';
        } else {
          this.data2.text = 'มีความสุขมวลรวมในระดับต่ำที่สุด';
        }
        console.log(`this Total ${this.TotalResQuestion}`);
        this.open(test);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  openLg() {
    $('#content').modal('show');
  }

  open(content) {
    this.modalService.open(content , { centered: true });
  }

  SwPage() {
    this.router.navigateByUrl('thankyou');
  }

}

