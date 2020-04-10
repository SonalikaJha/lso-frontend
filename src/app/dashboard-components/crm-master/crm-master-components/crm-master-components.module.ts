import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AddDepartmentComponent} from './add-department/add-department.component';
import {CrmMasterComponentsRoutingModule} from './crm-master-components-routing.module';
import {ReactiveFormsModule} from '@angular/forms';
import {AddClientTypeComponent} from './add-client-type/add-client-type.component';
import {AddLeadTypeComponent} from './add-lead-type/add-lead-type.component';
import {AddBranchComponent} from './add-branch/add-branch.component';
import {AddCompanyComponent} from './add-company/add-company.component';
import {AddLeadSourceComponent} from './add-lead-source/add-lead-source.component';
import {AddStaffComponent} from './add-staff/add-staff.component';
import {AddBrokerComponent} from './add-broker/add-broker.component';
import {AddBrokerageCompanyComponent} from './add-brokerage-company/add-brokerage-company.component';
import {AddProcessComponent} from './add-process/add-process.component';
import { AddSalesModelComponent } from './add-sales-model/add-sales-model.component';
import { RoleComponent } from './role/role.component';
import { UserComponent } from './user/user.component';

import { AddLeadRequirementComponent } from './add-lead-requirement/add-lead-requirement.component';

@NgModule({
  declarations: [
    AddDepartmentComponent,
    AddClientTypeComponent,
    AddLeadTypeComponent,
    AddBranchComponent,
    AddCompanyComponent,
    AddLeadSourceComponent,
    AddStaffComponent,
    AddBrokerComponent,
    AddBrokerageCompanyComponent,
    AddProcessComponent,
    AddSalesModelComponent,
    RoleComponent,
    UserComponent,

    AddLeadRequirementComponent
  ],
  imports: [
    CommonModule,
    CrmMasterComponentsRoutingModule,
    ReactiveFormsModule
  ]
})
export class CrmMasterComponentsModule {
}
