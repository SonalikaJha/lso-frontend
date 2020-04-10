
import {Component, OnInit} from '@angular/core';
import { FormBuilder, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {LeadRequirementService} from '../../../../services/lead-requirement.service';
import {UtilsService} from '../../../../utils/utils.service';
import Utils from '../../../../../assets/js/utils';
import _ from 'underscore';
@Component({
  selector: 'app-add-lead-requirement',
  templateUrl: './add-lead-requirement.component.html',
  styleUrls: ['./add-lead-requirement.component.scss']
})
export class AddLeadRequirementComponent implements OnInit {
  submitted = false;
  addLeadRequirementFormData: any;
  leadRequirementTableData = [];
  leadRequirementTableDataFetched = false;
  editingLeadRequirement = false;
  activeLeadRequirement: any;
  editingLeadRequirementData: false;


  constructor(
    private utils: UtilsService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private leadRequirementService: LeadRequirementService,
  ) { }

  ngOnInit() {
    this.getLeadRequirementList();
    this.initialiseLeadRequirementForm();
  }
  uniqueCodeValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      let isUniqueCode = [false];
      const companyData = this.addLeadRequirementFormData;
      if (companyData != null && !this.editingLeadRequirement) {
        this.leadRequirementTableData.map(
          (data) => {
            if (data['code'] === control.value) {
              isUniqueCode.push(true);
            }
          }
        );

      }
      if (this.editingLeadRequirement) {
        this.leadRequirementTableData.map(
          (data) => {
            if (data['code'] === control.value) {
              if(control.value != this.activeLeadRequirement['code'] ) {
                isUniqueCode.push(true);
              }
            }
          }
        );
            }
      return isUniqueCode.includes(true) ? { 'uniqueCode': { value: control.value } } : null;
    };
  }
  initialiseLeadRequirementForm() {
    this.addLeadRequirementFormData = this.formBuilder.group({
      name: ['', [Validators.required, Validators.pattern(this.utils.validations.generic)]],
      code: ['', [Validators.required, Validators.pattern(this.utils.validations.code), this.uniqueCodeValidator()]],
      // description: ['', [Validators.pattern(this.utils.validations.generic)]],
      isActive: [true]
    });
  }

  async getLeadRequirementList() {
    this.leadRequirementTableData = await this.leadRequirementService.getLeadRequirementList();
    this.leadRequirementTableDataFetched = true;
    this.utils.reInitialiseDataTable('dataTable', '');
  }

  get f() {
    return this.addLeadRequirementFormData.controls;
  }

  onSubmit() {
    this.submitted = true;
    // console.log('this', this.addLeadTypeFormData);
    if (this.addLeadRequirementFormData.invalid) {
      return;
    }
    if (this.editingLeadRequirement) {
      this.updateLeadRequirement(this.addLeadRequirementFormData.value);
    } else {
      this.addLeadRequirement(this.addLeadRequirementFormData.value);
    }
  }

  async addLeadRequirement(formData) {
    await this.leadRequirementService.addLeadRequirement(formData);
    this.resetFormAndRefreshList();
  }

  async updateLeadRequirement(formData) {
    await this.leadRequirementService.editLeadRequirement(formData, this.activeLeadRequirement.id);
    this.resetFormAndRefreshList();
  }

  resetFormAndRefreshList() {
    this.onReset();
    this.getLeadRequirementList();
  }

  onReset() {
    this.submitted = false;
    this.addLeadRequirementFormData.reset();
    this.editingLeadRequirement = false;
    this.activeLeadRequirement = '';
    this.editingLeadRequirementData = false;
    this.initialiseLeadRequirementForm();
  }

  editLeadRequirement(leadRequirementData) {
    this.editingLeadRequirement = true;
    this.activeLeadRequirement = leadRequirementData;
    this.addLeadRequirementFormData.setValue({
      name: leadRequirementData.name,
      code: leadRequirementData.code,
      // description: leadRequirementData.description || '',
      isActive: leadRequirementData.isActive,
    });
    // this.addLeadTypeFormData.get('code').disable();
    this.utils.gotoTop();
  }

  async deleteLeadRequirement(id) {
    await this.leadRequirementService.deleteLeadRequirement(this.activeLeadRequirement.id);
    // @ts-ignore
    window.hideBootStrapModal(id);
    this.activeLeadRequirement = '';
    this.getLeadRequirementList();
  }

  async changeLeadRequirementStatus(id) {
    this.activeLeadRequirement.isActive = !this.activeLeadRequirement.isActive;
    const response = await this.leadRequirementService.editLeadRequirement(this.activeLeadRequirement, this.activeLeadRequirement.id);
    // @ts-ignore
    window.hideBootStrapModal(id);
  }
}


