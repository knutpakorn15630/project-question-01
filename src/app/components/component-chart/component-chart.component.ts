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

  testarray = [];
  @ViewChild('chart') chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;


  constructor(private callApi: ServiceApiService) { }

  ngOnInit(): void {
    this.callApi.showChart().subscribe(
      (res) => {
        this.DataChart = res;
        this.DataChart.data.forEach((tiTle1) => {
          console.log(`this test ${tiTle1.title}`);
          tiTle1.options.forEach((Option1) => {
            console.log('sdafkasn', Option1.answers);
            this.testarray.push(Option1.answers);
            console.log(`-----------------${this.testarray}`);
            this.chartOptions = {
              series: [10, 45, 30],
              chart: {
                width: 380,
                type: 'pie'
              },
              labels: ['Team A', 'Team B', 'Team C', 'Team D', 'Team E'],
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

          });
        });
      }
    );
  }
}

