import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-sidebar-main',
  templateUrl: './sidebar-main.component.html',
  styleUrls: ['./sidebar-main.component.scss']
})
export class SidebarMainComponent implements OnInit {
  isSidebarCollapsed: boolean;

  constructor(private router: Router) {
  }


  ngOnInit() {
    this.getActiveComponent();
  }


  toggleCollapseSidebar() {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
   
  }

  private getActiveComponent() {
  
    this.getRouteInfo();
  }

  private getRouteInfo() {
    const arr = this.router.url.split('/');
    if (arr[0] === 'dashboard') {
    }
  }
}
