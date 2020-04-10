import {Component, OnInit} from '@angular/core';
import { FormBuilder, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {BranchService} from '../../../../services/branch.service';
import Utils from '../../../../../assets/js/utils';
import {CountryStateCityDataService} from '../../../../country-state-city-data.service';
import _ from 'underscore';
import {UtilsService} from '../../../../utils/utils.service';
import {AddCompanyService} from '../../../../services/add-company.service';

@Component({
  selector: 'app-add-branch',
  templateUrl: './add-branch.component.html',
  styleUrls: ['./add-branch.component.scss']
})
export class AddBranchComponent implements OnInit {
  submitted = false;
  formData: any;
  countryStateCityArray = [];
  stateArray = [];
  cityArray = [];
  activeBranch: any;
  branchTableData = [];
  editingBranchData = false;
  companyList = [];
  data: Array<any>;
  branchTableDataFetched= false;

  constructor(
    private utils: UtilsService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private branchService: BranchService,
    private addCompanyService: AddCompanyService,
    private countryStateCityData: CountryStateCityDataService
  ) {
  }

  ngOnInit() {
    this.getBranchList();
    this.getCompanyList();
    this.initialiseForm();
    //this.initialiseDataTable();
  }
  uniqueCodeValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      let isUniqueCode = [false];
      const branchData = this.formData;
      if (branchData != null && !this.editingBranchData) {
        this.branchTableData.map(
          (data) => {
            if (data['code'] === control.value) {
              isUniqueCode.push(true);
            }
          }
        );
      }
      if (this.editingBranchData) {
        this.branchTableData.map(
          (data) => {
            if (data['code'] === control.value) {
              if(control.value != this.activeBranch['code'] ) {
                isUniqueCode.push(true);
              }
            }
          }
        );
            }
      return isUniqueCode.includes(true) ? { 'uniqueCode': { value: control.value } } : null;
    };
  }
  initialiseForm() {
    this.formData = this.formBuilder.group({
      name: ['', [Validators.required, Validators.pattern(this.utils.validations.generic)]],
      code: ['', [Validators.required, Validators.pattern(this.utils.validations.code), this.uniqueCodeValidator()]],
      address: ['', [Validators.required, Validators.pattern(this.utils.validations.generic)]],
      companyId: ['', [Validators.required]],
      countryId: ['', [Validators.required]],
      stateId: [''],
      cityId: ['', [Validators.required]],
      landmark: ['', [Validators.pattern(this.utils.validations.generic)]],
      GSTIN: ['', [Validators.pattern(this.utils.validations.GSTIN)]],
      mobile: ['', [Validators.required, Validators.pattern(this.utils.validations.mobile)]],
      landline: ['', Validators.pattern(this.utils.validations.landline)],
      panNo: ['', [Validators.pattern(this.utils.validations.panNo)]],
      email: ['', [Validators.required, Validators.pattern(this.utils.validations.email)]],
      isActive: [true]
    });
  }

  async getBranchList() {
    this.branchTableData = await this.branchService.getBranchesList();
    this.branchTableDataFetched = true;
    this.utils.reInitialiseDataTable('dataTable', '');
    await this.updateCountryStateCityData();
    await this.getCompanyList();
  }
  async updateCountryStateCityData() {
    this.countryStateCityArray = await this.countryStateCityData.getStatesCityData();
    this.countryStateCityData.updateCountryStateCityData(this.branchTableData, this.countryStateCityArray);
  }

  get f() {
    return this.formData.controls;
  }

  onSubmit() {
    
    this.submitted = true;
  
    if (this.formData.invalid) {
      return;
    }
   
    if (this.editingBranchData) {
      this.updateBranch(this.formData.value);
    } else {
      this.addBranch(this.formData.value);
    }
  }

  async updateBranch(formData) {
    this.resetFormAndRefreshList(await this.branchService.editBranch(formData, this.activeBranch.id));
  }

  async addBranch(formData) {
    this.resetFormAndRefreshList(await this.branchService.addBranch(formData));
  }

  resetFormAndRefreshList(response) {
    if (response.status === 200) {
      this.onReset();
    }
    this.getBranchList();
  }

  async getCompanyList() {
    this.companyList = await this.addCompanyService.getCompaniesList();
    this.branchTableData = _.map(this.branchTableData, (data) => {
      _.map(this.companyList, (company) => {
        if (company.id === data.companyId) {
          data.companyName = company.name;
        }
      });
      return data;
    });
    this.companyList = this.companyList.filter((x) => {
      return x.isActive === true;
    });
  }


  onReset() {
    this.submitted = false;
    this.formData.reset();
    this.activeBranch = '';
    this.editingBranchData = false;
    this.initialiseForm();
  }

  editBranchData(addBranchData) {
  
    this.editingBranchData = true;
    this.activeBranch = addBranchData;
    this.populateStateDropdown(addBranchData.countryId);
    this.populateCityDropdown(addBranchData.stateId);
    this.formData.setValue({
      name: addBranchData.name || '',
      code: addBranchData.code || '',
      address: addBranchData.address,
      companyId: addBranchData.companyId || '',
      countryId: addBranchData.countryId,
      stateId: addBranchData.stateId,
      cityId: addBranchData.cityId,
      landmark: addBranchData.landmark || '',
      GSTIN: addBranchData.GSTIN || '',
      mobile: addBranchData.mobile,
      landline: addBranchData.landline || '',
      panNo: addBranchData.panNo || '',
      email: addBranchData.email,
      isActive: addBranchData.isActive
    });
    Utils.gotoTop();
  }

  // initialiseDataTable() {
  //   const columnsToBeSorted = {
  //     columns: [
  //       {name: 'Branch Name', orderable: true},
  //       {name: 'Code', orderable: true},
  //       {name: 'CompanyId', orderable: true},
  //       {name: 'GSTIN', orderable: false},
  //       {name: 'Pan No', orderable: false},
  //       {name: 'Address', orderable: false},
  //       {name: 'Country', orderable: true},
  //       {name: 'State', orderable: true},
  //       {name: 'City', orderable: true},
  //       {name: 'LandMark', orderable: false},
  //       {name: 'Mobile', orderable: false},
  //       {name: 'Email Id', orderable: false},
  //       {name: 'Land Line', orderable: false},
  //       {name: 'Status', orderable: false},
  //       {name: '', orderable: false}
  //     ]
  //   };
  //   setTimeout(() => {
  //     // @ts-ignore
  //     window.InitialiseDataTable('addBranchDataTable', columnsToBeSorted);
  //   }, 1000);
  // }

  populateStateDropdown(countryId) {
    this.stateArray = this.countryStateCityData.populateStateDropdown(this.countryStateCityArray, countryId);
  }

  populateCityDropdown(stateId) {
    this.cityArray = this.countryStateCityData.populateCityDropdown(this.stateArray, stateId);
  }

  async deleteBranch(id) {
    await this.branchService.deleteBranch(this.activeBranch.id);
    // @ts-ignore
    window.hideBootStrapModal(id);
    this.getBranchList();
    this.activeBranch = '';
  }

  async changeBranchStatus(id) {
    this.activeBranch.isActive = !this.activeBranch.isActive;
    await this.branchService.editBranch(this.activeBranch, this.activeBranch.id);
    // @ts-ignore
    window.hideBootStrapModal(id);
  }

}
