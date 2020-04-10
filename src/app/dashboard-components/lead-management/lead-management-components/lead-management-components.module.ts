import { ImportExportComponent } from './import-export/import-export.component';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {LeadManagementComponentsRoutingModule} from './lead-management-components-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AddLeadComponent} from './add-lead/add-lead.component';
import {ViewLeadsComponent} from './view-leads/view-leads.component';
import {PipelineComponent} from './pipeline/pipeline.component';
import {ClouserComponent} from './clouser/clouser.component';
import {OwlDateTimeModule, OwlNativeDateTimeModule} from 'ng-pick-datetime';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';


@NgModule({
  declarations: [
    AddLeadComponent,
    ViewLeadsComponent,
    PipelineComponent,
    ClouserComponent,
    ImportExportComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    LeadManagementComponentsRoutingModule,
    NgMultiSelectDropDownModule.forRoot()
  ]
})
export class LeadManagementComponentsModule {
}
