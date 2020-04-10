import { ChartsModule } from 'ng2-charts';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {DashboardComponentsRoutingModule} from './dashboard-components-routing.module';
import {DashboardComponent} from './dashboard/dashboard.component';
import {CrmMasterComponent} from './crm-master/crm-master.component';
import {LeaseDeedComponent} from './lease-deed/lease-deed.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {OwlDateTimeModule, OwlNativeDateTimeModule} from 'ng-pick-datetime';
import { LeadManagementComponent } from './lead-management/lead-management.component';
import { DwrComponent } from './dwr/dwr.component';
import { UserprofileComponent } from './userprofile/userprofile.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import {Ng2GoogleChartsModule} from 'ng2-google-charts';



@NgModule({
  declarations: [
    DashboardComponent,
    CrmMasterComponent,
    LeaseDeedComponent,
    LeadManagementComponent,
    DwrComponent,
    UserprofileComponent,

  ],
  imports: [
    CommonModule,
    DashboardComponentsRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    ChartsModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    NgMultiSelectDropDownModule.forRoot(),
    Ng2GoogleChartsModule
  ]
})
export class DashboardComponentsModule {
}
