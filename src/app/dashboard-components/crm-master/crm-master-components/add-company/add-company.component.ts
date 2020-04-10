import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AddCompanyService } from '../../../../services/add-company.service';
import { CountryStateCityDataService } from '../../../../country-state-city-data.service';
import { UtilsService } from '../../../../utils/utils.service';
import _ from 'underscore';

@Component({
  selector: 'app-add-company',
  templateUrl: './add-company.component.html',
  styleUrls: ['./add-company.component.scss']
})
export class AddCompanyComponent implements OnInit {
  submitted = false;
  addCompanyFormData: any;
  companyTableData = [];
  countryStateCityArray = [];
  stateArray = [];
  cityArray = [];
  activeCompany: any;
  editingCompanyData = false;
  companyTableDataFetched = false;

  constructor(
    private utils: UtilsService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private addCompanyService: AddCompanyService,
    private countryStateCityData: CountryStateCityDataService
  ) {
  }

  ngOnInit() {
    this.getCompanyList();
    this.initialiseForm();
    //this.initialiseDataTable();
  }

  uniqueCodeValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      let isUniqueCode = [false];
      const companyData = this.addCompanyFormData;
      if (companyData != null && !this.editingCompanyData) {
        this.companyTableData.map(
          (data) => {
            if (data['code'] === control.value) {
              isUniqueCode.push(true);
            }
          }
        );

      }
      if (this.editingCompanyData) {
        this.companyTableData.map(
          (data) => {
            if (data['code'] === control.value) {
              if(control.value != this.activeCompany['code'] ) {
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
    this.addCompanyFormData = this.formBuilder.group({
      name: ['', [Validators.required, Validators.pattern(this.utils.validations.generic)]],
      // code: ['', [Validators.required,Validators.pattern(this.utils.validations.code)]],
      code: ['', [Validators.required, Validators.pattern(this.utils.validations.code), this.uniqueCodeValidator()]],
      GSTIN: ['', [Validators.pattern(this.utils.validations.GSTIN)]],
      panNo: ['', [Validators.pattern(this.utils.validations.panNo)]],
      address: ['', [Validators.required, Validators.pattern(this.utils.validations.generic)]],
      countryId: ['', [Validators.required]],
      stateId: [''],
      cityId: ['', [Validators.required]],
      landmark: ['', Validators.pattern(this.utils.validations.generic)],
      mobile: ['', [Validators.required, Validators.pattern(this.utils.validations.mobile)]],
      landline: ['', Validators.pattern(this.utils.validations.landline)],
      //email: ['', [Validators.required, Validators.email]],
      email: ['', [Validators.required, Validators.pattern(this.utils.validations.email)]],
      isActive: [true]
    });
  }
  reinitialiseDataTable() {
    // @ts-ignore
    window.destroyDataTable('dataTable');
    setTimeout(() => {
      // @ts-ignore
      window.InitialiseDataTable('dataTable');
    }, 300);
  }

  async getCompanyList() {
    this.companyTableData = await this.addCompanyService.getCompaniesList();
    this.companyTableDataFetched = true;
    this.utils.reInitialiseDataTable('dataTable', '');
    await this.updateCountryStateCityData();
  }
 
  async updateCountryStateCityData() {
    this.countryStateCityArray = await this.countryStateCityData.getStatesCityData();
    this.companyTableData = this.countryStateCityData.updateCountryStateCityData(this.companyTableData, this.countryStateCityArray);
  }

  get f() {
    return this.addCompanyFormData.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.addCompanyFormData.invalid) {
      return;
    }

    if (this.editingCompanyData) {
      this.updateCompany(this.addCompanyFormData.value);
    } else {
      this.addCompany(this.addCompanyFormData.value);
    }
  }

  async addCompany(formData) {
    const response = await this.addCompanyService.addCompany(formData);
    if (typeof response === 'object') {
      this.toastr.success('Company Added.');
      this.resetFormAndRefreshList();
    }
  }

  async updateCompany(formData) {
    const response = await this.addCompanyService.editCompany(formData, this.activeCompany.id);
    if (typeof response === 'object') {
      this.toastr.success('Company updated.');
      this.resetFormAndRefreshList();
    }
  }

  resetFormAndRefreshList() {
    this.onReset();
    this.getCompanyList();
  }

  onReset() {
    this.submitted = false;
    this.addCompanyFormData.reset();
    this.activeCompany = '';
    this.editingCompanyData = false;
    this.initialiseForm();
  }

  editCompanyData(addCompanyData) {
    this.editingCompanyData = true;
    this.activeCompany = addCompanyData;
    this.populateStateDropdown(addCompanyData.countryId);
    this.populateCityDropdown(addCompanyData.stateId);
    this.addCompanyFormData.setValue({
      name: addCompanyData.name || '',
      code: addCompanyData.code || '',
      address: addCompanyData.address || '',
      countryId: addCompanyData.countryId || '',
      stateId: addCompanyData.stateId || '',
      cityId: addCompanyData.cityId || '',
      landmark: addCompanyData.landmark || '',
      GSTIN: addCompanyData.GSTIN || '',
      mobile: addCompanyData.mobile || '',
      landline: addCompanyData.landline || '',
      panNo: addCompanyData.panNo || '',
      email: addCompanyData.email || '',
      isActive: addCompanyData.isActive
    });
    this.utils.gotoTop();
  }

  // initialiseDataTable() {
  //   const columnsToBeSorted = {
  //     columns: [
  //       { name: 'Company Name', orderable: true },
  //       { name: 'Code', orderable: false },
  //       { name: 'GSTIN', orderable: false },
  //       { name: 'Pan No', orderable: false },
  //       { name: 'Address', orderable: false },
  //       { name: 'Country', orderable: true },
  //       { name: 'State', orderable: true },
  //       { name: 'City', orderable: true },
  //       { name: 'LandMark', orderable: false },
  //       { name: 'Mobile', orderable: false },
  //       { name: 'Email Id', orderable: false },
  //       { name: 'Land Line', orderable: false },
  //       { name: 'Status', orderable: true },
  //       { name: '', orderable: false }
  //     ]
  //   };
  //   setTimeout(() => {
  //     // @ts-ignore
  //     window.InitialiseDataTable('addCompanyDataTable', columnsToBeSorted);
  //   }, 1000);
  // }

  populateStateDropdown(countryId) {
    _.map(this.countryStateCityArray, (country) => {
      if (countryId === country._id) {
        this.stateArray = country.states;
      }
    });
    this.stateArray = _.sortBy(this.stateArray, 'name');
  }

  populateCityDropdown(stateId) {
    _.map(this.stateArray, (state) => {
      if (stateId === state._id) {
        this.cityArray = state.cities;
      }
    });
    this.cityArray = _.sortBy(this.cityArray, 'name');
  }

  async deleteCompany(id) {
    const response = await this.addCompanyService.deleteCompany(this.activeCompany.id);
    if (typeof response === 'object') {
      this.toastr.success('Company deleted.');

    }
    // @ts-ignore
    window.hideBootStrapModal(id);
    this.getCompanyList();
    this.activeCompany = '';
  }

  async changeCompanyStatus(id) {
    this.activeCompany.isActive = !this.activeCompany.isActive;
    const response = await this.addCompanyService.editCompany(this.activeCompany, this.activeCompany.id);
    // @ts-ignore
    window.hideBootStrapModal(id);
    if (typeof response === 'object') {
      this.toastr.success('Company updated.');
      this.resetFormAndRefreshList();
    }

  }
}
