import {NgModule, Component} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {DashboardComponent} from './dashboard/dashboard.component';
import {CrmMasterComponent} from './crm-master/crm-master.component';
import {LeaseDeedComponent} from './lease-deed/lease-deed.component';
import {LeadManagementComponent} from './lead-management/lead-management.component';
import {DwrComponent} from './dwr/dwr.component';
import {UserprofileComponent} from './userprofile/userprofile.component';
import { from } from 'rxjs';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'main',
    pathMatch: 'full'
  },
  {
    path: 'main',
    component: DashboardComponent
  },
  {
    path: 'user-profile',
    // redirectTo: 'main',
    component: UserprofileComponent
  },

  {
    path: 'crm-master',
    component: CrmMasterComponent,
    loadChildren: () => import('./crm-master/crm-master-components/crm-master-components.module')
      .then(m => m.CrmMasterComponentsModule)
  },
  {
    path: 'lead-management',
    component: LeadManagementComponent,
    loadChildren: () => import('./lead-management/lead-management-components/lead-management-components.module')
      .then(m => m.LeadManagementComponentsModule)
  },
  // {
  //   path: 'lease-deed',
  //   component: LeaseDeedComponent
  // }
  {
    path: 'dwr',
    component: DwrComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardComponentsRoutingModule {
}
