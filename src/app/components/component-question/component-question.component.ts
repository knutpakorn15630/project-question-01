import { Component, OnInit } from '@angular/core';
import { ResShowQuestion } from 'src/app/interface-api/interface-showquestion';
import { ServiceApiService } from 'src/app/service/service-api.service';

@Component({
  selector: 'app-component-question',
  templateUrl: './component-question.component.html',
  styleUrls: ['./component-question.component.scss']
})
export class ComponentQuestionComponent implements OnInit {

  DataResQuestion: ResShowQuestion = null;

  constructor(private callApi: ServiceApiService) { }

  ngOnInit(): void {
    this.ShowDataQuestion();
  }

  selectItem(i1: number, i2: number, i3: number) {
    this.DataResQuestion.mainTitle[i1].titles[i2].options.forEach((x , index) => {
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

}
