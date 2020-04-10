import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import _ from 'underscore';
import * as moment from 'moment';
import { LeadService } from './../../../../services/lead.service';
import { AddLeadComponent } from '../add-lead/add-lead.component';

declare var $: any;

@Component({
  selector: 'app-view-leads',
  templateUrl: './view-leads.component.html',
  styleUrls: ['./view-leads.component.scss'],
  providers: [AddLeadComponent]
})
export class ViewLeadsComponent implements OnInit {
  viewLeadData: any;
  viewLead: any;
  leads = [];
  dateRange = [];
  activeViewLead: any;
  importLeadButtonText = 'Import Leads';
  activeUserPermissions = [];
  constructor(
    private toastr: ToastrService,
    private leadService: LeadService,
    
  ) {
  }

  async ngOnInit() {
    await this.getLeadList();
    this.reinitialiseDataTable();

    this.getUserData();

  }

  getUserData() {
    const userData = localStorage.getItem('userData');
    if (userData !== null) {
      this.activeUserPermissions = JSON.parse(userData).role.permissions;
    }
  }

  async getLeadList() {
    this.leads = await this.leadService.leadFilter();

  }
 
  getStringified(lead) {
    return JSON.stringify(lead);
  }
  reinitialiseDataTable() {
    // @ts-ignore
    window.destroyDataTable('dataTable');
    setTimeout(() => {
      // @ts-ignore
      window.InitialiseDataTable('dataTable', {
        aaSorting: [],
        dom: 'Bfrtip',
        buttons: [
          'csv', 'excel'
        ]
      });

      $(document).ready(function () {
        $('#dataTable tfoot tr').clone(true).appendTo('#dataTable thead');
        $('#dataTable thead tr:eq(1) th').each(function (i) {
          var title = $(this).text();
          $(this).html('<input type="text" placeholder="Search ' + title + '" />');

          $('input', this).on('keyup change', function () {
            if (table.column(i).search() !== this.value) {
              table
                .column(i)
                .search(this.value)
                .draw();
            }
          });
        });

        var table = $('#dataTable').DataTable();

      });
    }, 300);

  }
  getFormattedDate(date) {
    const formattedDate = moment(date).format('ll');
    return formattedDate !== 'Invalid date' ? formattedDate : '-';
  }
  filterLeadByDate() {
    if (this.dateRange.length < 1) {
      this.toastr.warning('Please specify date range');
    } else {
      this.leads = _.filter(this.leads, (lead) => {
        const startDate = moment(this.dateRange[0]).subtract(1, 'days');
        const endDate = moment(this.dateRange[1]).add(1, 'days');
        return moment(lead.date).isBetween(startDate, endDate);
      });
      this.reinitialiseDataTable();
    }
  }
  async resetLeadList() {
    this.dateRange = [];
    await this.getLeadList();
  }
  async deleteLead(_id) {
    await this.leadService.deleteLead(this.activeViewLead._id);
    const index = this.leads.findIndex((lead) => {
      return lead._id === this.activeViewLead._id;
    });
    this.leads.splice(index, 1);
    // @ts-ignore
    window.hideBootStrapModal(_id);
  }
  editLeadData(viewLeadData: any) {
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
  updateLeadStatus(lead: any) {
  }
  async importLeads(uploadLeadCSV: HTMLInputElement) {
    this.importLeadButtonText = 'Importing Leads ... <i class="fa fa-spinner fa-spin"></i>';
    const fileList = uploadLeadCSV.files;
    if (fileList[0].name) {
      const arr = fileList[0].name.split('.');
    } else {
      this.toastr.error('File type is not Supported');
    }
    const response = await this.leadService.importLeads(this.createFormData(fileList[0]));
    this.importLeadButtonText = 'Import Leads';
  }
 getBudgetType(value = 'oth') {
    const dataSet = {
      fv: ' Furnishing Value',
      bv: 'Buying Value',
      sv: 'Sale Value',
      lv: 'Lease Value',
      lsonb: 'LSO NB Value',
      pcwow: 'Project Consultation WOW',
      brkrg: 'Brokerage',
      oth: 'Other'
    };
    return dataSet[value] ? dataSet[value] : 'Other';
  }

  createFormData(file) {
    const formData = new FormData();
    formData.set('file', file);
    return formData;
  }
  async changeViewLeadStatus(id) {
    this.activeViewLead.isActive = !this.activeViewLead.isActive;
    await this.leadService.status(this.activeViewLead.id, this.activeViewLead);
    // @ts-ignore
    window.hideBootStrapModal(id);
  }
}
