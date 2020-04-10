import { CountryStateCityDataService } from '../../../../country-state-city-data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LeadService } from '../../../../services/lead.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl, ValidationErrors } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import * as moment from 'moment';
import _ from 'underscore';
import { IDropdownSettings } from 'ng-multiselect-dropdown';

@Component({
  selector: 'app-add-lead',
  templateUrl: './add-lead.component.html',
  styleUrls: ['./add-lead.component.scss']
})
export class AddLeadComponent implements OnInit {
  submitted = false;
  editable = true;
  addLeadFormData: FormGroup;
  mobile = [''];
  email = [''];
  followUp = [''];
  country: any;
  state: any;
  // salesModelList = [];
  data = {
    branch: [],
    leadSource: [],
    leadType: [],
    leadRequirement: [],
    salesModel: [],
    badmin: [],
    stl: [],
    sm: [],
    stTc: [],
    dtl: [],
    da: [],
    pmc: [],
    all: []
  };
  areDealerOptionsVisible = false;
  areFMCOptionsVisible = false;
  minDate = new Date(moment().subtract(2, 'days').format('ll'));
  maxDate = new Date(moment().add(2, 'days').format('ll'));
  today = new Date();
  past = new Date('1/1/1900');

  activeDate = '';
  activeMobile = '';
  activeEmail = '';
  activeSalesModel = '';
  activeMeeter = '';
  activeRemark = '';
  activeOptions = {

    loi: false,
    siteVisit: false,
    testFitout: false,
    meeting: false,
    boq: false,
    option: false,
    agreement: false,
    whatsappGroup: false,
    designProposal: false,
    whatsappGroupLead: false,
    whatsappGroupPmc: false,
    whatsappGroupOwner: false,
    whatsappGroupTenant: false,
    finalLayout: false,
  };
  salesModelSelectDropdown: IDropdownSettings;
  selectedSalesModel = [];
  selectedMeetingsModel = [];
  dateRange: any;

  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private leadService: LeadService,
    private route: ActivatedRoute,
    private router: Router,
    private countryService: CountryStateCityDataService) {
  }

  ngOnInit() {
    // const isRouteValid = await this.checkRoute();
    this.addLeadFormData = this.formBuilder.group({
      date: ['', this.currentRouteType === 'add-lead' ? Validators.required : null],
      branchId: ['', Validators.required],
      leadSourceId: ['', []],
      leadTypeId: ['', []],
      leadRequirementId: ['', []],
      salesModelId: ['', []],
      badminId: ['', []],
      stlId: ['', []],
      smId: ['', []],
      stTcId: ['', []],
      dtlId: ['', []],
      daId: ['', []],
      pmcId: ['', []],
      // pipeline Requirement
      carpetArea: [''],
      superArea: [''],
      inventory: [''],
      meetings: this.formBuilder.array([]),
      // pipeline requirement
      // closure requirement
      furnishingValue: [''],
      saleValue: [''],
      leaseValue: [''],
      // closure requirement
      name: ['', [Validators.required]],
      mobile: this.formBuilder.array([], [Validators.required]),
      email: this.formBuilder.array([]),
      landline: ['', []],
      businessType: ['', []],
      // email: ['', [Validators.email]],
      dealerDetails: ['', []],
      dealerNumber: ['', []],
      dealer: this.formBuilder.group({
        name: [''],
        mobile: [''],
        email: [''],
        companyName: [''],
      }),
      fmc: this.formBuilder.group({
        name: [''],
        mobile: [''],
        email: [''],
        companyName: [''],
      }),
      cityId: ['', []],
      location: ['', []],
      country: [''],
      // microLocation: ['', []],
      sector: ['', []],
      towerNo: ['', []],
      unitNo: ['', []],
      floor: ['', []],
      project: ['', []],
      area: ['', []],
      budget: ['', []],
      budgetType: ['', []],
      requirement: ['', []],
      status: ['', []],
      remarks: ['', []],
      // status: ['', []],
      remark: ['', []],
      projectFee: ['', []],
      projectFeeType: ['', []],
      projectFeeRemarks: ['', []],
      welcomeCall: [false, []],
      welcomeText: [false, []],
      welcomeMail: [false, []],
      testFitout: [false, []],
      boq: [false, []],
      option: [false, []],
      agreement: [false, []],
      designProposal: [false, []],
      whatsappGroupLead: [false, []],
      whatsappGroupPMC: [false, []],
      whatsappGroupOwner: [false, []],
      whatsappGroupTenant: [false, []],
      finalLayout: [false, []],
      loi: [false, []],
      siteVisit: [false, []],
      meeting: [false, []],
      isActive: [false],
      followupDate: this.formBuilder.array([]),
    });
    if (this.currentRouteType === 'view-lead') {
      this.addLeadFormData.disable();
    }
    this.getNeededData();
    this.populateCities();
    this.salesModelSelectDropdown = {
      singleSelection: false,
      idField: 'id',
      textField: 'name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 5,
      allowSearchFilter: true
    };
  }

  async populateCities() {
    const cityData = await this.countryService.getStatesCityData();
    this.country = cityData.filter(e => e.name === 'India')[0];
  }

  selectState(event, cityId = null) {
    this.state = this.country.states.filter(e => e._id === event.target.value)[0];
    if (!cityId) {
      cityId = this.state.cities[0]._id;
    }
    this.addLeadFormData.patchValue({
      cityId
    });
  }

  setActiveMeeter(event) {
    this.activeMeeter = event.target.value;
  }

  setActiveRemark(event) {
    this.activeRemark = event.target.value;
  }

  test(event = null) { }

  addNewMeeting(value = { personId: [], remarks: '' }) {
    const meeting = this.f.meetings as FormArray;
    meeting.push(this.formBuilder.group({
      personId: this.formBuilder.array(value.personId),
      id: (new Date()).getTime(),
      remarks: [value.remarks, []]
    }));
  }

  removeMeetingAt(index = 0) {
    (this.addLeadFormData.controls.meetings as FormArray).removeAt(index);
  }

  get f(): any {
    return this.addLeadFormData.controls;
  }

  getFormValidationErrors() {
    Object.keys(this.addLeadFormData.controls).forEach(key => {
      const controlErrors: ValidationErrors = this.addLeadFormData.get(key).errors;
      if (controlErrors != null) {
        Object.keys(controlErrors).forEach(keyError => {
        
        });
      }
    });
  }

  showFormErrors(controls) {
    for (const control in controls) {
      if (controls.hasOwnProperty(control) && controls[control].status === 'INVALID') {
      }
    }
  }

  async onSubmit(valid) {
    this.submitted = true;
    if (this.addLeadFormData.invalid) {
      this.getFormValidationErrors();
      this.showFormErrors(this.addLeadFormData.controls);
      this.toastr.error('Please check the form again!');
      return;
    }

    


    const lead = Object.assign({}, this.addLeadFormData.value);
    // lead.followupDate = lead.followupDate.map(e => e.date);
    lead.mobile = lead.mobile.map(e => e.number).filter(e => e);
    lead.email = lead.email.map(e => e.email).filter(e => e);
    lead.salesModelId = this.selectedSalesModel.map(e => e.id);
    const meeters = this.selectedMeetingsModel.map(e => {
      return e.map(f => f.id);
    });
    lead.meetings = lead.meetings.map((e, i) => {
      delete e.personId;
      delete e.id;
      e.ids = meeters[i];
      return e;
    });

    for (const key in this.activeOptions) {
      if (this.activeOptions.hasOwnProperty(key)) {
        if (!this.activeOptions[key]) {
        } else {
          if (!lead[key]) {
            lead[key] = false;
          }
        }
      }
    }

    let success;
    if (this.currentRouteType === 'add-lead') {
      success = await this.leadService.create(lead);


      if (success != undefined && success != null && success != '') {
        this.router.navigate(['/dashboard/lead-management/view-lead/' + success.data.data.id]);
      }
      if (valid === 'pipeline') {

        this.pipeline(success.data.data.id, lead);
      } else if (valid === 'closure') {
        this.closure(success.data.data.id, lead);
      }

    } else if (this.currentRouteType === 'pipeline') {
      success = await this.leadService.pipeline(this.id, lead);
    } else if (this.currentRouteType === 'closure') {
      success = await this.leadService.closure(this.id, lead);
    } else if (this.currentRouteType === 'lead') {
      success = await this.leadService.MIS(this.id, lead);
    } else if (this.currentRouteType === 'view-lead') {
      success = await this.leadService.viewlead(this.id, lead);
    }
    if (success) {
      this.onReset();
    }
  }

  async pipeline(id, lead) {
    await this.leadService.pipeline(id, lead);
  }

  async closure(id, lead) {
    await this.leadService.closure(id, lead);
  }

  async onReset() {
    this.submitted = false;
    this.addLeadFormData.reset();
    while ((this.addLeadFormData.controls.followupDate as FormArray).controls.length > 0) {
      (this.addLeadFormData.controls.followupDate as FormArray).removeAt(0);
    }
    this.addNewFollowupDate();
    while ((this.addLeadFormData.controls.mobile as FormArray).controls.length > 0) {
      (this.addLeadFormData.controls.mobile as FormArray).removeAt(0);
    }
    this.addNewMobile();
    while ((this.addLeadFormData.controls.email as FormArray).controls.length > 0) {
      (this.addLeadFormData.controls.email as FormArray).removeAt(0);
    }
    this.addNewEmail();
    while ((this.addLeadFormData.controls.meetings as FormArray).controls.length > 0) {
      (this.addLeadFormData.controls.meetings as FormArray).removeAt(0);
    }
    this.changeCurrentModel(null, this.data.salesModel.length > 0 ? this.data.salesModel[0].code : 'NA');
    await this.changeBranch(this.data.branch.length > 0 ? this.data.branch[0].id : 'NA', true);
    this.state = this.country.states.filter(e => e.name === 'Haryana')[0];
    this.addLeadFormData.patchValue({
      businessType: '',
      budgetType: '',
      status: '',
      fee: '',
      country: 'India',
      cityId: '5dcd033a38014635646add9a',
      branchId: '',
      leadSourceId: '',
      leadTypeId: '',
      leadRequirementId: '',
      salesModelId: ''
    });
    this.selectedSalesModel = [];
    this.selectedMeetingsModel = [];
    this.checkRoute();
  }

  trackByFn(index: any, item: any) {
    return item.id;
    return index;
  }

  changeDealerOptionsVisibility(event) {
    const type = this.data.leadType.filter(e => e.id === this.f.leadTypeId.value)[0].code;
    this.areDealerOptionsVisible = type === 'cpt';
    this.areFMCOptionsVisible = type === 'fmc';
    if (type === 'cpt') {
      this.f.name.clearValidators();
      this.f.name.updateValueAndValidity();
      // @ts-ignore
      const groupItems = this.f.mobile.controls;
      for (const item of groupItems) {
        item.controls.number.clearValidators();
        item.controls.number.updateValueAndValidity();
      }
    } else {
      this.f.name.setValidators(Validators.required);
      this.f.name.updateValueAndValidity();
      // @ts-ignore
      const groupItems = this.f.mobile.controls;
      for (const item of groupItems) {
        item.controls.number.setValidators(Validators.required);
        item.controls.number.updateValueAndValidity();
      }
    }
  }

  async changeCurrentModel(event = null, code = null) {
    if (event) {
      const type = this.data.salesModel.filter(e => e.id === event.target.value)[0].code;
      this.activeSalesModel = type;
    } else {
      this.activeSalesModel = code;
    }
    // check all active options
    for (const key in this.activeOptions) {
      if (this.activeOptions.hasOwnProperty(key)) {
        this.activeOptions[key] = this.shouldBeShown(key);
      }
    }
  }

  private shouldBeShown(option = '') {
    const models = {
      'LSO-NB': ['loi'],
      'LSO-STOCK': ['loi'],
      'WOW-OFFICE': ['testFitout', 'boq', 'loi'],
      'WOW-HOMES': ['testFitout', 'boq', 'loi'],
      'COM-LEASE': ['option', 'loi'],
      'COM-RESALE': ['option', 'agreement'],
      'COM-FS': ['option'],
      'RES-RESALES': ['option', 'agreement'],
      'RES-LEASE': ['option', 'agreement'],
      'RES-FS': ['option'],
      'WOW-OFFICE-HOME': ['whatsappGroup', 'designProposal', 'agreement'],
      LSO: ['whatsappGroup'],
      CONSTRUCTION: [],
    };
    if (!this.activeSalesModel || !(this.activeSalesModel in models)) {
      return false;
    }
    return models[this.activeSalesModel].includes(option);
  }

  setActiveDate(e) {
    this.activeDate = e.value;
  }

  addNewFollowupDate(value = { date: '', isDone: false, followupRemarks: '' }) {
    const followupDate = this.f.followupDate as FormArray;
    followupDate.push(this.formBuilder.group({
      id: (new Date()).getTime(),
      date: value.date,
      isDone: value.isDone,
      followupRemarks: value.followupRemarks
    }));
  }

  removeFollowupDateAt(index = 0) {
    (this.addLeadFormData.controls.followupDate as FormArray).removeAt(index);
  }

  addFollowUp() {
    this.addLeadFormData.addControl('followUp' + (this.followUp.length + 1), this.formBuilder.control(''));
    this.followUp.push('');
  }

  setActiveMobile(e) {
    this.activeMobile = e.target.value;
  }

  addNewMobile(value = '') {
    const mobile = this.f.mobile as FormArray;
    mobile.push(this.formBuilder.group({
      id: (new Date()).getTime(),
      number: [value, [Validators.required]]
    }));
  }

  removeMobileAt(index = 0) {
    (this.addLeadFormData.controls.mobile as FormArray).removeAt(index);
  }

  setActiveEmail(e) {
    this.activeEmail = e.target.value;
  }

  addNewEmail(value = '') {
    const email = this.f.email as FormArray;
    email.push(this.formBuilder.group({
      id: (new Date()).getTime(),
      email: [value, [Validators.email]]
    }));
  }

  removeEmailAt(index = 0) {
    (this.addLeadFormData.controls.email as FormArray).removeAt(index);
  }

  async changeBranch(e, isId = false) {
    const id = isId ? e : e.target.value;
    const branchData = await this.leadService.getAllData();
    // const branchData = await this.leadService.getBranchData(id);
    this.data = Object.assign(this.data, branchData);
    this.addLeadFormData.patchValue({
      stlId: '',
      smId: '',
      stTcId: '',
      dtlId: '',
      daId: '',
      pmcId: '',
    });
  }

  async getNeededData() {
    this.data = await this.leadService.getNeededData();
    const sales = this.data.salesModel.filter((x) => {
      return x.isActive === true;
    });
    this.data.salesModel = sales;
    const requirement = this.data.leadRequirement.filter((x) => {
      return x.isActive === true;
    });
    this.data.leadRequirement = requirement;
    this.onReset();
  }

  get id(): string {
    return this.route.snapshot.paramMap.get('id');
  }

  async checkRoute() {
    if (this.currentRouteType === 'view-lead') {
      this.editable = false;
    }
    if (this.currentRouteType !== 'add-lead') {
      const id = this.id;
      const response = await this.leadService.detail(id);
      Object.keys(response).forEach(key => (!response[key]) && delete response[key]);
      response.followupDate = response.followupDate.filter(e => e);
      this.addLeadFormData.patchValue(response);
      if (response.followupDate.length > 0) {
        while ((this.addLeadFormData.controls.followupDate as FormArray).controls.length > 0) {
          (this.addLeadFormData.controls.followupDate as FormArray).removeAt(0);
        }
        response.followupDate.forEach(e => {
          this.addNewFollowupDate(e);
        });
      }
      if (response.mobile.length > 0) {
        while ((this.addLeadFormData.controls.mobile as FormArray).controls.length > 0) {
          (this.addLeadFormData.controls.mobile as FormArray).removeAt(0);
        }
        response.mobile.forEach(e => {
          this.addNewMobile(e);
        });
      }
      if (response.meetings.length > 0) {
        while ((this.addLeadFormData.controls.meetings as FormArray).controls.length > 0) {
          (this.addLeadFormData.controls.meetings as FormArray).removeAt(0);
        }
        response.meetings.forEach(e => {
          this.addNewMeeting(e);
          const t = this.data.all.filter(f => e.personId.includes(f.id));
          this.selectedMeetingsModel.push(t);
        });
      } else {
        this.selectedMeetingsModel.push([]);
        this.addNewMeeting();
      }
      if (response.email.length > 0) {
        while ((this.addLeadFormData.controls.email as FormArray).controls.length > 0) {
          (this.addLeadFormData.controls.email as FormArray).removeAt(0);
        }
        response.email.forEach(e => {
          this.addNewEmail(e);
        });
      }
      this.selectedSalesModel = this.data.salesModel.filter(e => response.salesModelId.includes(e.id));
      this.changeDealerOptionsVisibility(null);

      // set city
      try {
        let city;
        let state;
        for (const s of this.country.states) {
          const cityCandidate = s.cities.filter(c => c._id === response.cityId);
          if (cityCandidate.length > 0) {
            state = s;
            city = cityCandidate[0];
            break;
          }
        }
        this.selectState({ target: { value: state._id } }, city._id);
      } catch (err) {
        console.error('couldnot update state and city');
      }
    }
  }

  get budgetType(): string {
    return this.addLeadFormData.controls.budgetType.value;
  }

  get brokerageType(): string {
    return this.addLeadFormData.controls.projectFee.value;
  }

  get currentRouteType(): string {
    return this.route.snapshot.url[0].path;
  }

  get currentRouteLabel(): string {
    return this.currentRouteType.replace('-', ' ').toUpperCase();
  }
}
