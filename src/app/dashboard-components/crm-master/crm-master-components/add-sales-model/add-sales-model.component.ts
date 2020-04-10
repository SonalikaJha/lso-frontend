import {Component, OnInit} from '@angular/core';
import { FormBuilder, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {SalesModelService} from '../../../../services/sales-model.service';
import _ from 'underscore';
import Utils from '../../../../../assets/js/utils.js';
import {UtilsService} from '../../../../utils/utils.service';

@Component({
  selector: 'app-add-sales-model',
  templateUrl: './add-sales-model.component.html',
  styleUrls: ['./add-sales-model.component.scss']
})
export class AddSalesModelComponent implements OnInit {
  submitted = false;
  addSalesModelFormData: any;
  salesModelTableDataFetched = false;
  salesModelTableData = [];
  editingSalesModel = false;
  activeSalesModel: any;

  constructor(
    private utils: UtilsService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private salesModelService: SalesModelService
  ) {
  }

  ngOnInit() {
    this.getSalesModelList();
    this.initialiseForm();
  }


  uniqueCodeValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      let isUniqueCode = [false];
      const salesModelData = this.addSalesModelFormData;
      if (salesModelData != null && !this.editingSalesModel) {
        this.salesModelTableData.map(
          (data) => {
            if (data['code'] === control.value) {
              isUniqueCode.push(true);
            }
          }
        );

      }
      if (this.editingSalesModel) {
        this.salesModelTableData.map(
          (data) => {
            if (data['code'] === control.value) {
              if(control.value != this.activeSalesModel['code'] ) {
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
    this.addSalesModelFormData = this.formBuilder.group({
      name: ['', [Validators.required, Validators.pattern(this.utils.validations.generic)]],
     
      code: ['', [Validators.required, Validators.pattern(this.utils.validations.code), this.uniqueCodeValidator()]],
      description: ['',  [ Validators.pattern(this.utils.validations.generic)]],
      isActive: [true]
    });
  }

  async getSalesModelList() {
    this.salesModelTableData = await this.salesModelService.getSalesModelsList();
    this.salesModelTableDataFetched = true;
    this.utils.reInitialiseDataTable('dataTable', '');
  }

  get f() {
    return this.addSalesModelFormData.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.addSalesModelFormData.invalid) {
      return;
    }
    if (this.editingSalesModel) {
      this.updateSalesModel(this.addSalesModelFormData.value);
    } else {
      this.addSalesModel(this.addSalesModelFormData.value);
    }
  }

  async addSalesModel(formData) {
    await this.salesModelService.addSalesModel(formData);
    this.resetFormAndRefreshList();
  }

  async updateSalesModel(formData) {
    await this.salesModelService.editSalesModel(formData, this.activeSalesModel.id);
    this.resetFormAndRefreshList();
  }

  resetFormAndRefreshList() {
    this.onReset();
    this.getSalesModelList();
  }

  onReset() {
    this.submitted = false;
    this.addSalesModelFormData.reset();
    this.editingSalesModel = false;
    this.activeSalesModel = '';
    this.initialiseForm();
  }

  editSalesModel(salesModelData) {
    this.editingSalesModel = true;
    this.activeSalesModel = salesModelData;
    this.addSalesModelFormData.setValue({
      name: salesModelData.name,
      code: salesModelData.code,
      description: salesModelData.description || '',
      isActive: salesModelData.isActive,
    });
    Utils.gotoTop();
  }
  async deleteSalesModel(id) {
    await this.salesModelService.deleteSalesModel(this.activeSalesModel.id);
    // @ts-ignore
    window.hideBootStrapModal(id);
    this.activeSalesModel = '';
    this.getSalesModelList();
  }

  async changeSalesModelStatus(id) {
    this.activeSalesModel.isActive = !this.activeSalesModel.isActive;
    const response = await this.salesModelService.editSalesModel(this.activeSalesModel, this.activeSalesModel.id);
    // @ts-ignore
    window.hideBootStrapModal(id);
  }

}
