import { ImportExportComponent } from './import-export/import-export.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AddLeadComponent} from './add-lead/add-lead.component';
import {ViewLeadsComponent} from './view-leads/view-leads.component';
import {PipelineComponent} from './pipeline/pipeline.component';
import {ClouserComponent} from './clouser/clouser.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'add-lead'
  },
  {
    path: 'add-lead',
    component: AddLeadComponent
  },
  {
    path: 'view-leads',
    component: ViewLeadsComponent
  },
  {
    path: 'import-export',
    component: ImportExportComponent
  },
  {
    path: 'lead/:id',
    component: AddLeadComponent
  },
  {
    path: 'pipeline/:id',
    component: AddLeadComponent
  },
  {
    path: 'closure/:id',
    component: AddLeadComponent
  },
  {
    path: 'view-lead/:id',
    component: AddLeadComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LeadManagementComponentsRoutingModule { }
