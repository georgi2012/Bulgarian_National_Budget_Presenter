import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

@Component({
  selector: 'app-doughnut-chart',
  templateUrl: './doughnut-chart.page.html',
  styleUrls: ['./doughnut-chart.page.scss'],
})
export class DoughnutChartPage implements OnInit, AfterViewInit {

  @ViewChild('barCanvas') private barCanvas: ElementRef;
  barChart: Chart;
  backcolors: string[] = [];
  @Input() isIncome: boolean = false;
  @Input() labels: string[] = [];
  @Input() subLabels: string[] = [];
  @Input() values: number[] = [];
  @Input() subValues: number[] = [];




  constructor() {
    Chart.register(...registerables);
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.barChartMethod();
  }

  public updateData(values: number[], labels: string[], sublbls: string[], subdt: number[], isIncome: boolean) {
    this.values = values;
    this.labels = labels;
    this.subLabels = sublbls;
    this.subValues = subdt;
    this.isIncome = isIncome;
    this.barChart.destroy();
    this.barChartMethod();
  }

  barChartMethod() {
    const backgroundColorIn = [
      "rgba(0,153,51,255)",
      "rgba(0,87,63,255)",
      "rgba(0,51,51,255)",
      "rgba(0,102,0,255)",
      "rgba(0,102,102,255)",
      "rgba(51,102,51,255)",
      "rgba(0,153,51,255)",
      "rgba(0,87,63,255)",
      "rgba(0,51,51,255)",
      "rgba(0,102,0,255)",
      "rgba(0,102,102,255)",
      "rgba(51,102,51,255)"
    ];
    const backgroundColorOut = [
      "rgba(102,0,51,255)",
      "rgba(167,0,45,255)",
      "rgba(102,0,51,255)",
      "rgba(153,0,51,255)",
      "rgba(153,0,102,255)",
      "rgba(153,51,51,255)",
      "rgba(102,0,51,255)",
      "rgba(167,0,45,255)",
      "rgba(102,0,51,255)",
      "rgba(153,0,51,255)",
      "rgba(153,0,102,255)",
      "rgba(153,51,51,255)"
    ];
    this.backcolors = this.isIncome ? backgroundColorIn : backgroundColorOut;

    console.log("making doughnut with", this.subValues, this.values);
    this.barChart = new Chart(this.barCanvas.nativeElement, {
      type: 'doughnut',
      data: {
        datasets: [{
          data:
            this.subValues,

          backgroundColor: this.backcolors
        }, {
          data:
            this.values,
          backgroundColor: this.backcolors.map(x => x.replace("255", "20")),
        }],
        // labels:
        //          this.labels,

      },
      plugins: [ChartDataLabels],
      options: {

        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
            display: false // Hide Y axis labels
          },

        },
        plugins: {
          legend: { display: false },
          datalabels: {
            color: 'white',
            anchor: 'center',
            // clamp: true
            // align: 'end'
          }
        }
      }
    });
  }
}
