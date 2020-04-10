import { RoleComponent } from './role/role.component';
import { UserComponent } from './user/user.component';
import { AddLeadRequirementComponent } from './add-lead-requirement/add-lead-requirement.component';
import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AddDepartmentComponent} from './add-department/add-department.component';
import {AddClientTypeComponent} from './add-client-type/add-client-type.component';
import {AddLeadTypeComponent} from './add-lead-type/add-lead-type.component';
import {AddBranchComponent} from './add-branch/add-branch.component';
import {AddCompanyComponent} from './add-company/add-company.component';
import {AddLeadSourceComponent} from './add-lead-source/add-lead-source.component';
import {AddStaffComponent} from './add-staff/add-staff.component';
import {AddBrokerComponent} from './add-broker/add-broker.component';
import {AddBrokerageCompanyComponent} from './add-brokerage-company/add-brokerage-company.component';
import {AddProcessComponent} from './add-process/add-process.component';
import {AddSalesModelComponent} from './add-sales-model/add-sales-model.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'add-department'
  },
  {
    path: 'add-department',
    component: AddDepartmentComponent,
  },
  {
    path: 'add-client-type',
    component: AddClientTypeComponent,
  },
  {
    path: 'add-lead-type',
    component: AddLeadTypeComponent,
  },
  {
    path: 'add-branch',
    component: AddBranchComponent,
  },
  {
    path: 'add-company',
    component: AddCompanyComponent,
  },
  {
    path: 'add-lead-source',
    component: AddLeadSourceComponent,
  },
  {
    path: 'add-staff',
    component: AddStaffComponent,
  },
  {
    path: 'add-broker',
    component: AddBrokerComponent,
  },
  {
    path: 'add-brokerage-company',
    component: AddBrokerageCompanyComponent,
  },
  {
    path: 'add-process',
    component: AddProcessComponent,
  },
  {
    path: 'add-sales-model',
    component: AddSalesModelComponent,
  },
  {
    path: 'add-lead-requirement',
    component: AddLeadRequirementComponent,
  },
  {
    path: 'role',
    component: RoleComponent
  },
  {
    path: 'user',
    component: UserComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CrmMasterComponentsRoutingModule {
}
