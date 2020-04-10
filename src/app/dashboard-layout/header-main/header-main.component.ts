import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-header-main',
  templateUrl: './header-main.component.html',
  styleUrls: ['./header-main.component.scss']
})
export class HeaderMainComponent implements OnInit {
  activeUser: any;
  constructor(
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getActiveUserData();
  }
  logOut() {
    localStorage.clear();
    this.router.navigate(['/']).then(r => {
      this.toastr.success('Logged Out Successfully!', '');
    });
  }
  getActiveUserData() {
    this.activeUser = JSON.parse(localStorage.getItem('userData'));
   
  }
}
