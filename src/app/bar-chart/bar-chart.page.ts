import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, ViewChild } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.page.html',
  styleUrls: ['./bar-chart.page.scss'],
})
export class BarChartPage implements OnInit, AfterViewInit {

  @ViewChild('barCanvas') private barCanvas: ElementRef;
  barChart: Chart;

  @Input() labels: string[] = [];
  @Input() values: number[] = [];


  constructor() {
    Chart.register(...registerables);
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.barChartMethod();
  }

  public updateData(values: number[], labels: string[]) {
    this.values = values;
    this.labels = labels;
    this.barChart.destroy();
    this.barChartMethod();
  }

  barChartMethod() {
    console.log("created", this.values, this.labels);
    // const labels = ["Приходи", "Разходи"];
    const backgroundColor = ["rgba(1,86,63,255)", "rgba(168,3,46,255)"];

    this.barChart = new Chart(this.barCanvas.nativeElement, {
      type: 'bar',
      data: {
        labels: this.labels,
        datasets: [
          {
            barPercentage: 0.75,
            barThickness: 'flex',
            // maxBarThickness: 150,
            // minBarLength: 2,
            categoryPercentage: 0.8,
            //label: "Национален бюджет 2022",
            backgroundColor: backgroundColor,
            data: this.values,

          }
        ]
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
            align: 'end'
          }
        }
      }
    });
  }
}
