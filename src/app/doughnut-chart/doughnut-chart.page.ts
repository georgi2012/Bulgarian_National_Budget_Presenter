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

  public updateData(values: number[], labels: string[], sublbls: string[], subdt: number[]) {
    this.values = values;
    this.labels = labels;
    this.subLabels = sublbls;
    this.subValues = subdt;
    this.barChart.destroy();
    this.barChartMethod();
  }

  barChartMethod() {
    // const labels = ["Приходи", "Разходи"];
    const backgroundColor = ["rgba(1,86,63,255)", "rgba(168,3,46,255)"];
    //const values = [32764778.9, 20061825.9];
    console.log("making doughnut with", this.subValues, this.values);
    this.barChart = new Chart(this.barCanvas.nativeElement, {
      type: 'doughnut',
      data: {
        datasets: [{
          data:
            this.subValues,

          backgroundColor: [
            "#F7464A",
            "#46BFBD",
            "#FDB45C",
            "#949FB1",
            "#4D5360",
          ],
        }, {
          data:
            this.values,
          backgroundColor: [
            "#F7464A",
            "#46BFBD",
            "#FDB45C",
            "#949FB1",
            "#4D5360",
          ],
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
          // legend: { display: false },
          // datalabels: {
          //   color: 'white',
          //   anchor: 'center',
          //   // clamp: true
          //   align: 'end'
          // }
        }
      }
    });
  }
}
