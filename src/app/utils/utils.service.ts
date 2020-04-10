import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import _ from 'underscore';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {
  validations = {
    generic: '^([^<>])+$',
    // mobile: '^([0-9 \\-()+[\\]])+$',
    mobile: '[0-9]{10}',
    GSTIN: '[a-zA-Z0-9]{15}',
    panNo: '[a-zA-Z0-9]{10}',
    landline: '^([0-9 \\-()+[\\]])+$',

    code: '([a-zA-Z0-9\\-.[\\]])+$',
    email: '([a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$)'

  };
  constructor(
    private toastr: ToastrService
  ) { }

  checkApiResponse(response) {
    if (response.status === 200) {
      return response.data.data;
    } else {
      this.toastValidationErrors(response.data.errors);
      this.toastr.error(response.data.message);
      return [];
    }
  }

  toastValidationErrors(errors) {
    for (const key in errors) {
      if (errors.hasOwnProperty(key)) {
        errors[key].forEach(error => {
          this.toastr.error(error);
        });
      }
    }
  }

  gotoTop() {
    document.getElementById('mainRouterOutlet').scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }

  async getBranchName(leads, branchList) {
    return _.map(leads, (lead) => {
      _.map(branchList, (branch) => {
        if (branch.id === lead.branchId) {
          lead.branchName = branch.name;
        }
      });
      return lead;
    });
  }

  getLeadSourceName(leads, leadSourceList) {
    return _.map(leads, (lead) => {
      _.map(leadSourceList, (leadSource) => {
        if (leadSource.id === lead.leadSourceId) {
          lead.leadSourceName = leadSource.name;
        }
      });
      return lead;
    });
  }
  getLeadTypeName(leads, leadTypeList) {
    return _.map(leads, (lead) => {
      _.map(leadTypeList, (leadType) => {
        if (leadType.id === lead.leadTypeId) {
          lead.leadTypeName = leadType.name;
        }
      });
      return lead;
    });
  }

  getLeadRequirementName(leads, leadRequirementList) {
    return _.map(leads, (lead) => {
      _.map(leadRequirementList, (leadRequirement) => {
        if (leadRequirement.id === lead.leadRequirementId) {
          lead.leadRequirementName = leadRequirement.name;
        }
      });
      return lead;
    });
  }

  getSalesModelName(leads, salesModelList) {
    return _.map(leads, (lead) => {
      lead.salesModelName = '';
      _.map(salesModelList, (salesModel) => {
        _.map(lead.salesModelId, (leadSalesModel) => {
          if (salesModel.id === leadSalesModel) {
            lead.salesModelName += salesModel.name + `,`;
          }
        });
      });
      lead.salesModelName = lead.salesModelName.replace(/,\s*$/, '');
      return lead;
    });
  }

  getUserName(leads, userList) {
    const userRoleIds = ['smId', 'dtlId', 'stlId', 'stTcId', 'daId', 'badminId'];

    const newLeads = _.map(leads, (lead) => {

      _.map(userList, (user) => {
        _.map(userRoleIds, (userRoleId) => {
          if (user.id === lead[userRoleId]) {
            const userRoleName = userRoleId.substring(0, userRoleId.length - 2) + 'Name';
            lead[userRoleName] = user.name;
          }
        });
      });

      // get all users for a meeting
      lead.meetings = lead.meetings.map(meeting => {
        meeting.personId = meeting.personId.map(personId => {
          return userList.find(user => user.id === personId);
        });
        return meeting;
      });

      return lead;
    });
    return newLeads;
  }
  reInitialiseDataTable(tableId, options) {
    // @ts-ignore
    window.jQuery('#' + tableId).dataTable().fnDestroy();
    setTimeout(() => {
      if (options === '') {
        // @ts-ignore
        window.jQuery('#' + tableId).dataTable({
          autoWidth: false
        });
      } else {
        options.autoWidth = false;
        // @ts-ignore
        window.jQuery('#' + tableId).dataTable(options);
      }
      // @ts-ignore
      window.jQuery('#' + tableId + ' tr th').removeAttr('style');
    }, 100);
  }
}
