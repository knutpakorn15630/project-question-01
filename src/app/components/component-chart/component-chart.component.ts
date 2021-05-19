import { Component, OnInit, ViewChild } from '@angular/core';
import * as Chart from 'chart.js';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import * as pluginLabels from 'chartjs-plugin-labels';
import { Label, SingleDataSet } from 'ng2-charts';
import { ResShowChart } from 'src/app/interface-api/interfae-Chart';
import { ServiceApiService } from 'src/app/service/service-api.service';




@Component({
  selector: 'app-component-chart',
  templateUrl: './component-chart.component.html',
  styleUrls: ['./component-chart.component.scss']
})
export class ComponentChartComponent implements OnInit {
  DataChart: ResShowChart = null;

  myChart: any;
  typeChart: any;
  dataChart: any;
  optionsChart: any;

  pieChartOptions: ChartOptions;
  pieChartLabels: Label[] = [];
  pieChartData: SingleDataSet[] = [];
  pieChartType: ChartType;
  pieChartLegend: boolean;
  pieChartPlugins = [];
  constructor(private callApi: ServiceApiService) { }

  async ngOnInit(): Promise<void> {
    await this.showChart();
    await this.sleeper(300);
    interface DataChart2 {
      id: number;
      name: string;
      count: number;
    }

    this.DataChart.data.forEach((x, i) => {
      const data: DataChart2[] = [];
      x.options.forEach((x2) => {
        const data2: DataChart2 = {
          id: x2.id,
          name: x2.nameOption,
          count: x2.answers.length
        };
        data.push(data2);
      });

      const renderData: number[] = [];
      const renderLabel: string[] = [];

      for (const [ii, x3] of data.entries()) {
        renderData.push(x3.count);
        renderLabel.push(x3.name);
      }

      this.pieChartOptions = this.createOptions();
      this.pieChartLabels.push(renderLabel);
      this.pieChartData.push(renderData);
      this.pieChartType = 'doughnut';
      this.pieChartLegend = true;

    });

    this.myChart = new Chart('#test', {
      type: 'doughnut',
    });
    this.pieChartPlugins = [pluginLabels];
  }

  private createOptions(): ChartOptions {
    return {
      rotation: 2,
      responsive: true,
      maintainAspectRatio: true,
      plugins: {
        labels: {
          render: 'percentage',
          fontColor: ['#0031d4', '#0031d4', '#0031d4', '#0031d4', '#0031d4',
            '#0031d4', '#0031d4', '#0031d4', '#0031d4', '#0031d4', '#0031d4', '#0031d4', '#0031d4'],
          precision: 2
        }
      },
    };
  }

  showChart() {
    return new Promise((resolve, reject) => {
      this.callApi.showChart().subscribe(
        (res) => {
          this.DataChart = res;
          return resolve(null);
        },
        (err) => {
          return reject(err);
        }
      );
    });
  }

  sleeper(ms) {
    return new Promise(resolve => setTimeout(() => resolve(null), ms));
  }
}
export interface DataBar {
  dataSet: DataBarDataSet[];
}
export interface DataBarDataSet {
  data: ChartDataSets[];
}
