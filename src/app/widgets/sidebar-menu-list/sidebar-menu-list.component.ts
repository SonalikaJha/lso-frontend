import { Component, OnInit } from '@angular/core';
import { sample } from 'rxjs/operators';

@Component({
  selector: 'app-sidebar-menu-list',
  templateUrl: './sidebar-menu-list.component.html',
  styleUrls: ['./sidebar-menu-list.component.scss']
})
export class SidebarMenuListComponent implements OnInit {
  isSidebarCollapsed = false;

  activeUser: any;

  constructor() { }

  ngOnInit() {
    this.getActiveUserData();
  }

  toggleCollapseSidebar() {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;

  }

  disableDropDownAutoClose(e) {
    e.stopPropagation();
  }
  getActiveUserData() {
    this.activeUser = JSON.parse(localStorage.getItem('userData'));

  }
}
