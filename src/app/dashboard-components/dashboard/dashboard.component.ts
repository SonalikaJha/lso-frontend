import { PushNotificationService } from '../../services/push-notification.service';
import { DashboardService } from '../../services/dashboard.service';
import { DashboardChartService } from '../../services/dashboard-chart.service';
import { Component, HostListener, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import {
  ChartReadyEvent, ChartErrorEvent, ChartSelectEvent,
  ChartMouseOverEvent, ChartMouseOutEvent
} from 'ng2-google-charts';
import { GoogleChartInterface } from 'ng2-google-charts/google-charts-interfaces';
import { LeadService } from '../../services/lead.service';
import { UtilsService } from '../../utils/utils.service';
import { UserService } from '../crm-master/crm-master-components/user.service';
import * as moment from 'moment';
import * as _ from 'underscore';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  users = [];
  activeUser: any;

  constructor(
    private utils: UtilsService,
    private userService: UserService,
    private toastr: ToastrService,
    private leadService: LeadService,
    private dashboardService: DashboardService,
    private dashboardChartService: DashboardChartService,
    private pushService: PushNotificationService,
    private route: ActivatedRoute,
    private router: Router,) {
    this.pushService.initiate();
  }

  filteredData: any;
  chartTypes = ['today', 'current-week', 'current-month', 'date-Range'];
  activeChartType = this.chartTypes[0];
  activeUserChartType;
  dateRange: any;
  dateRangeDisplayed: any;
  public columnChart: GoogleChartInterface = {
    chartType: 'ColumnChart',
    dataTable: [
      ['Lead', ''],
      ['MIS', 10],
      ['Pipeline', 20],
      ['Closure', 30]
    ],
    options: {
      legend: { position: 'top' },
      chartArea: {
        right: 120,   // set this to adjust the legend width    // set this eventually, to adjust the left margin
      }
    }
  };
  public pieChart: GoogleChartInterface = {
    chartType: 'PieChart',
    dataTable: [
      ['Lead', ''],
      ['MIS', 10],
      ['Pipeline', 20],
      ['Closure', 30]
    ],
    options: {}
  };

  public salesModelPieChart: GoogleChartInterface = {
    chartType: 'PieChart',
    dataTable: [
      ['Lead', ''],
      ["LSO - New Business", 10],
      ["LSO - Stock Lease", 10],
      ["CGH - Commercial Lease - Tenant", 10],
      ["CGH - Commercial Lease - Owner", 10]
    ],
    options: {}
  };


  leadList = [];
  leads = [];
  userLeads = [];
  salesData = [];
  async ngOnInit() {

    this.notification();

    this.getActiveUserData();
    this.initializeChart();
    this.leadList = await this.leadService.leadList() as any;
    this.salesData = await this.dashboardService.getSalesModelList();

    this.salesData.forEach(s => {
      this.salesModelPieChart.dataTable.push([s.name, 10])
    });
    if (!this.activeUserChartType) {
      this.userLeads = this.leadList;
    }
    this.userFilter();

  }

  async initializeChart() {
    this.filteredData = await this.dashboardService.getLeads("") as any;

    this.filterChartsByToday();
  }

  async filterChartsByToday() {
    this.columnChart.dataTable = this.dashboardChartService.getTodayColumnChartData(this.filteredData);
    this.pieChart.dataTable = this.dashboardChartService.getTodayPieChartData(this.filteredData);

    let s = await this.dashboardService.arrangeSalesLeadByDate(this.activeUserChartType, this.activeChartType, this.dateRange);
    this.salesModelPieChart.dataTable = await this.dashboardChartService.getSalePieChartData(s);
    const date = new Date();
    this.dateRangeDisplayed = 'From Date : ' + moment(date).format('DD/MM/YYYY');
    this.followUpDataList();
    this.refreshCharts('event');
  }
  async filterChartsByWeek() {
    this.columnChart.dataTable = this.dashboardChartService.getWeeklyColumnChartData(this.filteredData);
    this.pieChart.dataTable = this.dashboardChartService.getWeeklyPieChartData(this.filteredData);

    let s = await this.dashboardService.arrangeSalesLeadByDate(this.activeUserChartType, this.activeChartType, this.dateRange);
    this.salesModelPieChart.dataTable = await this.dashboardChartService.getSalePieChartData(s);
    this.followUpDataList();
    const date = new Date();
    this.dateRangeDisplayed = 'From Date : ' + moment(date).startOf('week').format('DD/MM/YYYY') +
      ' ~ ' + moment(date).format('DD/MM/YYYY');

    this.refreshCharts('event');
  }
  async filterChartsByMonth() {
    this.dateRangeSelected();
    this.pieChart.dataTable = this.dashboardChartService.getMonthlyPieChartData(this.filteredData);

    let s = await this.dashboardService.arrangeSalesLeadByDate(this.activeUserChartType, this.activeChartType, this.dateRange);
    this.salesModelPieChart.dataTable = await this.dashboardChartService.getSalePieChartData(s);

    const date = new Date();
    this.dateRangeDisplayed = 'From Date : ' + moment(date).startOf('month').format('DD/MM/YYYY') +
      ' ~ ' + moment(date).format('DD/MM/YYYY');

    this.refreshCharts('event');
  }

  changeChartTypes() {

    switch (this.activeChartType) {
      case this.chartTypes[0]: {
        this.filterChartsByToday();
      }
        break;
      case this.chartTypes[1]: {
        this.filterChartsByWeek();
      }
        break;
      case this.chartTypes[2]: {
        this.filterChartsByMonth();
      }
        break;

      case this.chartTypes[3]: {
        // @ts-ignore
        window.jQuery('#dRange').click();
      }
    }

  }

  refreshCharts(event) {
    this.columnChart.component.draw();
    this.salesModelPieChart.component.draw();
    this.pieChart.component.draw();

  }

  async dateRangeSelected() {
    this.followUpDataList();
    let dates = [];
    if (this.activeChartType == "current-month") {
      dates.push(moment().startOf('month').format('DD/MMM/YYYY'));
      dates.push(moment().format('DD/MMM/YYYY'));

      this.dateRange = [];
    }
    else {
      dates.push(this.dateRange[0]);
      dates.push(this.dateRange[1]);
      this.dateRangeDisplayed = 'From Date : ' + moment(this.dateRange[0]).format('DD/MM/YYYY')
        + ' ~ ' + moment(this.dateRange[1]).format('DD/MM/YYYY');
    }
    const dataByRange = await this.dashboardService.filterLeadsByDateRange(dates);
    this.columnChart.dataTable = dataByRange.columnDataTable;
    this.pieChart.dataTable = dataByRange.pieChartDataTable;

    let s = await this.dashboardService.arrangeSalesLeadByDate(this.activeUserChartType, this.activeChartType, this.dateRange);
    this.salesModelPieChart.dataTable = await this.dashboardChartService.getSalePieChartData(s);

    this.refreshCharts('event');

  }
  async userFilter() {
    const userList = await this.userService.list();
    this.users = userList;

    this.users.sort(function (x, y) {
      if (x.name < y.name) return -1;
      if (x.name > y.name) return 1;
      return 0;
    })

  }

  filterLeadsAccordingToDays() {
    let ld = [];
    let currentDate = new Date();

    if (this.activeChartType == "today") {
      this.userLeads.map(l => {

        l.followupDate.map(d => {

          let date = moment(d.date).format('DD/MM/YYYY');
          let today = moment(currentDate).format('DD/MM/YYYY');

          if (date == today) {
            ld.push(l);
          }
        });
      });
      this.leads = ld;
      this.reinitialiseDataTable();
    } else if (this.activeChartType == "current-week") {

      this.userLeads.map(l => {

        l.followupDate.map(d => {
          let start = moment(currentDate).startOf('week').format('DD/MM/YYYY');
          let end = moment(currentDate).format('DD/MM/YYYY');
          let date = moment(d.date).format('DD/MM/YYYY');

          var d1 = start.split("/");
          var d2 = end.split("/");
          var c = date.split("/");

          var from = new Date(parseInt(d1[2]), parseInt(d1[1]) - 1, parseInt(d1[0]));  // -1 because months are from 0 to 11
          var to = new Date(parseInt(d2[2]), parseInt(d2[1]) - 1, parseInt(d2[0]));
          var check = new Date(parseInt(c[2]), parseInt(c[1]) - 1, parseInt(c[0]));


          if (check >= from && check <= to) {
            this.leads.push(l);
          }
        });
      });
      this.reinitialiseDataTable();
    } else if (this.activeChartType == "current-month") {
      let start = moment().startOf('month').format('DD/MM/YYYY');
      let end = moment().format('DD/MM/YYYY');
      var d1 = start.split("/");
      var d2 = end.split("/");

      var from = new Date(parseInt(d1[2]), parseInt(d1[1]) - 1, parseInt(d1[0]));  // -1 because months are from 0 to 11
      var to = new Date(parseInt(d2[2]), parseInt(d2[1]) - 1, parseInt(d2[0]));

      this.userLeads.map(l => {
        l.followupDate.map(d => {
          let date = moment(d.date).format('DD/MM/YYYY');


          var c = date.split("/");


          var check = new Date(parseInt(c[2]), parseInt(c[1]) - 1, parseInt(c[0]));
          if (check >= from && check <= to) {

            this.leads.push(l);
          }

        });
      });
      this.reinitialiseDataTable();
    } else {
      let start = moment(this.dateRange[0]).format('DD/MM/YYYY');
      let end = moment(this.dateRange[1]).format('DD/MM/YYYY');
      var d1 = start.split("/");
      var d2 = end.split("/");
      var from = new Date(parseInt(d1[2]), parseInt(d1[1]) - 1, parseInt(d1[0]));  // -1 because months are from 0 to 11
      var to = new Date(parseInt(d2[2]), parseInt(d2[1]) - 1, parseInt(d2[0]));

      this.userLeads.map(l => {

        l.followupDate.map(d => {


          let date = moment(d.date).format('DD/MM/YYYY');


          var c = date.split("/");


          var check = new Date(parseInt(c[2]), parseInt(c[1]) - 1, parseInt(c[0]));

          if (check >= from && check <= to) {
            this.leads.push(l);
          }

        });

      });
      this.reinitialiseDataTable();
    }

  }

  async userChart() {

    this.filteredData = await this.dashboardService.getLeads(this.activeUserChartType) as any;
    if (this.activeChartType == "today")
      this.filterChartsByToday();
    else if (this.activeChartType == "current-week")
      this.filterChartsByWeek();

    else if (this.activeChartType == "current-month")
      this.filterChartsByMonth();
    else {
      this.dateRangeSelected();
    }
  }

  checkLeadStatus(lead) {
    if (lead.closureDate) {
      return 'Closure';
    } else if (lead.pipelineDate) {
      return 'Pipeline';
    } else {
      return 'MIS';
    }
  }

  getFormattedDate(date) {
    const formattedDate = moment(date).format('ll');
    return formattedDate !== 'Invalid date' ? formattedDate : '-';
  }

  getActiveUserData() {
    this.activeUser = JSON.parse(localStorage.getItem('userData'));
  }

  reinitialiseDataTable() {

    // @ts-ignore
    window.destroyDataTable('dataTable');
    setTimeout(() => {
      // @ts-ignore
      window.InitialiseDataTable('dataTable', {
        aaSorting: []
      });
    }, 500);
  }

  async followUpDataList() {
    let data = {
      "startDate": "",
      "endDate": "",
      "userId": ""
    }
    let todayData = {
      "today": "",
      "userId": ""
    }
    if (this.activeChartType === "today") {
      todayData.today = moment().format('YYYY-MM-DD');
      if (this.activeUserChartType != "" && this.activeUserChartType != undefined) {
        todayData.userId = this.activeUserChartType;
        this.leads = await this.dashboardService.followupdata(todayData);
      } else {
        this.leads = await this.dashboardService.followupdata(todayData);
      }
    } else if (this.activeChartType === "current-week") {
      data.startDate = moment().startOf('week').format('YYYY-MM-DD');
      data.endDate = moment().format('YYYY-MM-DD');
      if (this.activeUserChartType != "" && this.activeUserChartType != undefined) {
        data.userId = this.activeUserChartType;
        this.leads = await this.dashboardService.followupdata(data);
      } else {
        this.leads = await this.dashboardService.followupdata(data);
      }
    } else if (this.activeChartType === "current-month") {
      data.startDate = moment().startOf('month').format('YYYY-MM-DD');
      data.endDate = moment().format('YYYY-MM-DD');
      if (this.activeUserChartType != "" && this.activeUserChartType != undefined) {
        data.userId = this.activeUserChartType;
        this.leads = await this.dashboardService.followupdata(data);
      } else {
        this.leads = await this.dashboardService.followupdata(data);
      }
    } else {
      data.startDate = moment(this.dateRange[0]).format('YYYY-MM-DD');
      data.endDate = moment(this.dateRange[1]).format('YYYY-MM-DD');
      if (this.activeUserChartType != "" && this.activeUserChartType != undefined) {
        data.userId = this.activeUserChartType;
        this.leads = await this.dashboardService.followupdata(data);
      } else {
        this.leads = await this.dashboardService.followupdata(data);
      }
    }
    this.reinitialiseDataTable();
  }
  // notification() {
  //   this.dashboardService.notification();
    
     
  //   }
  async notification() {
 let response=await this.dashboardService.notification();
 if (response.data.data.length > 0) {
 let data = [];
 data = response.data.data;
 console.log(response.data.data);
 data.forEach(e => {
 // let totoTemplate="You have a follow-up scheduled with " + e.name + "(" + e.mobile[0] + ")" +" today at"
 // + moment(e.followupDate[0].date).utcOffset("+05:30").format("hh:mm A") + ", " + "Branch:" + e.branchId.name+
 // "<a class='link'[routerLink]="'/dashboard/lead-management/view-lead/' + e.id+"+>VIEW LEAD</a>";
 this.router.navigate(['/dashboard/lead-management/view-lead/' + e._id]).then(() => {
 this.toastr.success('your message', 'Success!!',{timeOut:0, enableHtml: true, closeButton: true, tapToDismiss: false});
 });
 // this.toastr.success(totoTemplate, 'Print toto', {timeOut:0, enableHtml: true, closeButton: true, tapToDismiss: false});
 });
 
 }
 }
}
