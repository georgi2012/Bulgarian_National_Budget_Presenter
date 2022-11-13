import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'bar-chart',
    loadChildren: () => import('./bar-chart/bar-chart.module').then( m => m.BarChartPageModule)
  },
  {
    path: 'doughnut-chart',
    loadChildren: () => import('./doughnut-chart/doughnut-chart.module').then( m => m.DoughnutChartPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
