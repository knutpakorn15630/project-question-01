import { Component, OnInit } from '@angular/core';
import { ReqDataQuestion, ReqMainTitle, ReqOption, ReqTitle, ResDataQuestion, ResShowQuestion } from 'src/app/interface-api/interface-showquestion';
import { ServiceApiService } from 'src/app/service/service-api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-component-question',
  templateUrl: './component-question.component.html',
  styleUrls: ['./component-question.component.scss']
})
export class ComponentQuestionComponent implements OnInit {

  DataResQuestion: ResShowQuestion = null;
  TotalResQuestion: ResDataQuestion = null;
  CheckRed = false;

  constructor(private callApi: ServiceApiService) { }

  ngOnInit(): void {
    this.ShowDataQuestion();
  }

  selectItem(i1: number, i2: number, i3: number) {
    this.DataResQuestion.mainTitle[i1].titles[i2].options.forEach((x, index) => {
      this.DataResQuestion.mainTitle[i1].titles[i2].options[index].text = '';
      this.DataResQuestion.mainTitle[i1].titles[i2].options[index].isSelect = false;
      this.DataResQuestion.mainTitle[i1].titles[i2].options[index].isCheck = 0;
    });
    this.DataResQuestion.mainTitle[i1].titles[i2].options[i3].isSelect = true;
    this.DataResQuestion.mainTitle[i1].titles[i2].options[i3].isCheck = 1;
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
    this.DataResQuestion.mainTitle.forEach((x) => {
      x.titles.forEach((a) => {
        a.options.forEach((b) => {
          if (!b.isCheck  || !b.isSelect) {
            this.CheckRed = true;
          }
        });
      });
    });
  }


  SubmitDataQuestion() {
    const body: ReqDataQuestion = {
      formId: this.DataResQuestion.id,
      mainTitle: []
    };

    for (const data1 of this.DataResQuestion.mainTitle) {
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
        // console.log(`this Total ${this.TotalResQuestion}`);
        Swal.fire({
          icon: 'success',
          title: 'บันทึกข้อมูลเสร็จสิ้น',
          showConfirmButton: false,
          timer: 1000
        });
      },
      (err) => {
        console.log(err);
      }
    );
  }

}

