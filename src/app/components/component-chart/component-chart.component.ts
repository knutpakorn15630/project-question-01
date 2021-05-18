import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartComponent } from 'ng-apexcharts';
import {
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexChart
} from 'ng-apexcharts';
import { ResShowChart } from 'src/app/interface-api/interfae-Chart';
import { ServiceApiService } from 'src/app/service/service-api.service';


export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
};

@Component({
  selector: 'app-component-chart',
  templateUrl: './component-chart.component.html',
  styleUrls: ['./component-chart.component.scss']
})
export class ComponentChartComponent implements OnInit {
  DataChart: ResShowChart = null;

  testnumber: [];
  @ViewChild('chart') chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

  constructor(private callApi: ServiceApiService) { }

  ngOnInit(): void {
    this.callApi.showChart().subscribe(
      (res) => {
        this.DataChart = res;

        this.DataChart.data.forEach((tiTle1) => {
          console.log(`this test ${tiTle1.title}`);

          tiTle1.options.forEach((Options) => {
            console.log(`this test22222222222 ${Options.nameOption}`);
            Options.textOptionChart = Options.nameOption;
            this.chartOptions = {
              series: [Options.answers.length],
              chart: {
                width: 380,
                type: 'pie'
              },
              labels: [Options.nameOption],
              responsive: [
                {
                  breakpoint: 480,
                  options: {
                    chart: {
                      width: 200
                    },
                    legend: {
                      position: 'bottom'
                    }
                  }
                }
              ]
            };
            console.log('this test3333333333', Options.textOptionChart);
          });
        });
      }
    );
  }

}

