import {RoleService} from './role.service';
import { FormBuilder, Validators, ValidatorFn, AbstractControl, FormGroup } from '@angular/forms';
import {Component, OnInit} from '@angular/core';
import Utils from '../../../../../assets/js/utils';
import {UtilsService} from '../../../../utils/utils.service';

class Role {
  id: string;
  name: string;
  code: string;
  description: string;

  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.scss']
})
export class RoleComponent implements OnInit {

  title = 'Role';
  data = [];
  formData: FormGroup;
  editing = false;
  submitted = false;
  activeEntry: any;
  activeUser: any;
  permissionsList = [];
  dataFetched= false;


  constructor(
    private utils: UtilsService,
    private formBuilder: FormBuilder,
    private roleService: RoleService
  ) {
  }

  ngOnInit() {
    this.list();
    this.getActiveUserData();
    this.initialiseForm();
    // this.initialiseDataTable();
    this.getPermissionsList();
  }


  uniqueCodeValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      let isUniqueCode = [false];
      const roleData = this.formData;
      if (roleData != null && !this.editing) {
        this.data.map(
          (data) => {
            if (data['code'] === control.value) {
              isUniqueCode.push(true);
            }
          }
        );

      }
      if(this.editing) {
        this.data.map(
          (data) => {
            if (data['code'] === control.value) {
              if(control.value != this.activeEntry['code']) {
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
      //code: ['', [Validators.required, Validators.pattern(this.utils.validations.code)]],
      code: ['', [Validators.required, Validators.pattern(this.utils.validations.code), this.uniqueCodeValidator()]],
      description: ['', [Validators.pattern(this.utils.validations.generic)]],
      permissions: [''],
      isActive: [true],
    });
  }


  // initialiseDataTable() {
  //   const columnsToBeSorted = {
  //     // columns: [
  //     //   {name: 'Name', orderable: true}
  //     // ]
  //   };
  //   setTimeout(() => {
  //     // @ts-ignore
  //     window.InitialiseDataTable('dataTable', columnsToBeSorted);
  //   }, 1000);
  // }


  get f() {
    return this.formData.controls;
  }

  get fields(): Array<string> {
    return Object.keys(this.f);
  }


  /**
   * Make the form editable
   */
  edit(entry) {
    this.activeEntry = entry;
    this.editing = true;
    const obj = {};
    for (const key in this.f) {
      if (this.f.hasOwnProperty(key)) {
        obj[key] = this.activeEntry[key] || '';
      }
    }
    // @ts-ignore
    window.jQuery('#permissions_select_picker').selectpicker('val', this.activeEntry.permissions);
    setTimeout(() => {
      // @ts-ignore
      window.jQuery('#permissions_select_picker').selectpicker('refresh');
    }, 500);
    this.formData.setValue(obj);
    Utils.gotoTop();
  }

  async list() {
    this.data = await this.roleService.list();
    this.dataFetched = true;
    this.utils.reInitialiseDataTable('dataTable', '');
  }
 
  async submit() {
    this.submitted = true;
    if (this.formData.invalid) {
      return;
    }
    let success = false;
    const data = this.formData.value;
    if (!Array.isArray(data.permissions)) {
      data.permissions = data.permissions.split(',').map(permission => permission.trim());
    }
    if (this.editing) {
      success = await this.roleService.update(this.activeEntry.id, this.formData.value);
    } else {
      success = await this.roleService.create(this.formData.value);
    }
    if (success) {
      this.list();
      this.reset();
      this.initialiseForm();
    }
  }

  async delete() {
    const success = await this.roleService.delete(this.activeEntry.id);
    if (success) {
      this.list();
    }
    this.reset();
    this.initialiseForm();
  }

  reset() {
    this.submitted = false;
    this.editing = false;
    this.formData.reset();
    this.activeEntry = {};
    this.initialiseForm();
    // @ts-ignore
    window.jQuery('#permissions_select_picker').selectpicker('val', []);
    setTimeout(() => {
      // @ts-ignore
      window.jQuery('#permissions_select_picker').selectpicker('refresh');
    }, 500);
  }

  async changeRoleStatus(id) {
    this.activeEntry.isActive = !this.activeEntry.isActive;
    const response = await this.roleService.editRole(this.activeEntry, this.activeEntry.id);
    // @ts-ignore
    window.hideBootStrapModal(id);
  }

  getActiveUserData() {
    this.activeUser = JSON.parse(localStorage.getItem('userData'));
   
  }

  async getPermissionsList() {
    this.permissionsList = await this.roleService.getPermissionsList();
    setTimeout(() => {
      // @ts-ignore
      window.jQuery('#permissions_select_picker').selectpicker('refresh');
    }, 500);
  }
}
