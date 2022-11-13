import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DoughnutChartPage } from './doughnut-chart.page';

const routes: Routes = [
  {
    path: '',
    component: DoughnutChartPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DoughnutChartPageRoutingModule {}
