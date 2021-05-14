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

  constructor(private callApi: ServiceApiService) { }

  ngOnInit(): void {
    this.ShowDataQuestion();
  }

  selectItem(i1: number, i2: number, i3: number) {
    this.DataResQuestion.mainTitle[i1].titles[i2].options.forEach((x, index) => {
      this.DataResQuestion.mainTitle[i1].titles[i2].options[index].text = '';
      this.DataResQuestion.mainTitle[i1].titles[i2].options[index].isSelect = false;
    });
    this.DataResQuestion.mainTitle[i1].titles[i2].options[i3].isSelect = true;
  }

  ShowDataQuestion() {
    this.callApi.showQuestion(1).subscribe(
      (res) => {
        this.DataResQuestion = res;
        // console.log(`this is ----------- ${this.DataResQuestion}`);
      }
    );
  }

  SubmitDataQuestion() {
    const body: ReqDataQuestion = {
      formId: this.DataResQuestion.id,
      mainTitle: []
    };

    for (const DataTitle of this.DataResQuestion.mainTitle) {
      const title: ReqMainTitle = {
        id: DataTitle.id,
        titles: []
      };
      for (const DataOption of DataTitle.titles) {
        const Option: ReqTitle = {
          id: DataOption.mainTitleId,
          options: []
        };
        for (const IdOption of DataOption.options) {
          if (!IdOption.isSelect) { continue; }
          const IdOption2: ReqOption = {
            id: IdOption.id
          };
          Option.options.push(IdOption2);
        }
        title.titles.push(Option);
        if (Option.options.length === 0) {
          Swal.fire({
            icon: 'warning',
            title: 'กรุณาเลือกตัวเลือกให้ครบ!',
            showConfirmButton: false,
            timer: 1000
          });
          return;
        }
      }
      setTimeout(() => {
        body.mainTitle.push(title);
        console.log('this body', JSON.stringify(body));
      }, 1000);
    }
    console.log(body);

    this.callApi.getCheckQuestion(body).subscribe(
      (res) => {
        this.TotalResQuestion = res;
        console.log(`this Total ${this.TotalResQuestion}`);
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

