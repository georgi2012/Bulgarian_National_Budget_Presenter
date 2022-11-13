import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DoughnutChartPageRoutingModule } from './doughnut-chart-routing.module';

import { DoughnutChartPage } from './doughnut-chart.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DoughnutChartPageRoutingModule
  ],
  declarations: [DoughnutChartPage],
  exports: [DoughnutChartPage]
})
export class DoughnutChartPageModule { }
