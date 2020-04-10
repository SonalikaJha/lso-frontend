import {Component, OnInit} from '@angular/core';
import { FormBuilder, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {LeadTypeService} from '../../../../services/lead-type.service';
import {UtilsService} from '../../../../utils/utils.service';
import Utils from '../../../../../assets/js/utils';
import _ from 'underscore';

@Component({
  selector: 'app-add-lead-type',
  templateUrl: './add-lead-type.component.html',
  styleUrls: ['./add-lead-type.component.scss']
})
export class AddLeadTypeComponent implements OnInit {
  submitted = false;
  addLeadTypeFormData: any;
  leadTypeTableData = [];
  leadTypeTableDataFetched = false;
  editingLeadType = false;
  activeLeadType: any;
  editingLeadTypeData: false;

  constructor(
    private utils: UtilsService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private leadTypeService: LeadTypeService,
  ) {
  }

  ngOnInit() {
    this.getLeadTypeList();
    this.initialiseLeadTypeForm();
  }
  uniqueCodeValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      let isUniqueCode = [false];
      const companyData = this.addLeadTypeFormData;
      if (companyData != null && !this.editingLeadType) {
        this.leadTypeTableData.map(
          (data) => {
            if (data['code'] === control.value) {
              isUniqueCode.push(true);
            }
          }
        );

      }
      if (this.editingLeadType) {
        this.leadTypeTableData.map(
          (data) => {
            if (data['code'] === control.value) {
              if(control.value != this.activeLeadType['code'] ) {
                isUniqueCode.push(true);
              }
            }
          }
        );
            }
      return isUniqueCode.includes(true) ? { 'uniqueCode': { value: control.value } } : null;
    };
  }
  initialiseLeadTypeForm() {
    this.addLeadTypeFormData = this.formBuilder.group({
      name: ['', [Validators.required, Validators.pattern(this.utils.validations.generic)]],
      code: ['', [Validators.required, Validators.pattern(this.utils.validations.code), this.uniqueCodeValidator()]],
      description: ['', [Validators.pattern(this.utils.validations.generic)]],
      isActive: [true]
    });
  }

  async getLeadTypeList() {
    this.leadTypeTableData = await this.leadTypeService.getLeadTypeList();
    this.leadTypeTableDataFetched = true;
    this.utils.reInitialiseDataTable('dataTable', '');
  }

  get f() {
    return this.addLeadTypeFormData.controls;
  }

  onSubmit() {
    this.submitted = true;
    // console.log('this', this.addLeadTypeFormData);
    if (this.addLeadTypeFormData.invalid) {
      return;
    }
    if (this.editingLeadType) {
      this.updateLeadType(this.addLeadTypeFormData.value);
    } else {
      this.addLeadType(this.addLeadTypeFormData.value);
    }
  }

  async addLeadType(formData) {
    await this.leadTypeService.addLeadType(formData);
    this.resetFormAndRefreshList();
  }

  async updateLeadType(formData) {
    await this.leadTypeService.editLeadType(formData, this.activeLeadType.id);
    this.resetFormAndRefreshList();
  }

  resetFormAndRefreshList() {
    this.onReset();
    this.getLeadTypeList();
  }

  onReset() {
    this.submitted = false;
    this.addLeadTypeFormData.reset();
    this.editingLeadType = false;
    this.activeLeadType = '';
    this.editingLeadTypeData = false;
    this.initialiseLeadTypeForm();
  }

  editLeadType(leadTypeData) {
    this.editingLeadType = true;
    this.activeLeadType = leadTypeData;
    this.addLeadTypeFormData.setValue({
      name: leadTypeData.name,
      code: leadTypeData.code,
      description: leadTypeData.description || '',
      isActive: leadTypeData.isActive,
    });
    // this.addLeadTypeFormData.get('code').disable();
    this.utils.gotoTop();
  }

  async deleteLeadType(id) {
    await this.leadTypeService.deleteLeadType(this.activeLeadType.id);
    // @ts-ignore
    window.hideBootStrapModal(id);
    this.activeLeadType = '';
    this.getLeadTypeList();
  }

  async changeLeadTypeStatus(id) {
    this.activeLeadType.isActive = !this.activeLeadType.isActive;
    const response = await this.leadTypeService.editLeadType(this.activeLeadType, this.activeLeadType.id);
    // @ts-ignore
    window.hideBootStrapModal(id);
  }
}
