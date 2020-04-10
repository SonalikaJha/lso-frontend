import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {DashboardLayoutRoutingModule} from './dashboard-layout-routing.module';
import {DashboardLayoutComponent} from './dashboard-layout.component';
import {HeaderMainComponent} from './header-main/header-main.component';
import {SidebarMainComponent} from './sidebar-main/sidebar-main.component';
import {SidebarMenuListComponent} from '../widgets/sidebar-menu-list/sidebar-menu-list.component';


@NgModule({
  declarations: [
    DashboardLayoutComponent,
    HeaderMainComponent,
    SidebarMainComponent,
    SidebarMenuListComponent
  ],
  imports: [
    CommonModule,
    DashboardLayoutRoutingModule
  ]
})
export class DashboardLayoutModule {
}
