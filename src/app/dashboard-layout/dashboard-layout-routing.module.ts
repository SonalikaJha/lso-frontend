import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {DashboardLayoutComponent} from './dashboard-layout.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardLayoutComponent,
    loadChildren: () => import('../dashboard-components/dashboard-components.module')
      .then(m => m.DashboardComponentsModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardLayoutRoutingModule {
}
