import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import Utils from '../../../../../assets/js/utils';
import { UtilsService } from '../../../../utils/utils.service';
import { LeadService } from '../../../../services/lead.service';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import _ from 'underscore';
import { from } from 'rxjs';



class User {
  id: string;
  name: string;
  email: string;
  mobile: string;
  Password: string;
  ConfirmPassword: string;
  CompanyId: any;
  RoleId: any;
  BranchId: any;
  isActive: any;
}

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  userData: any;
  branchId = [];
  companyList = [];
  roleList = [];
  branchList = [];
  // branchUserList = [];
  supervisorList = [];
  title = 'User';
  data: Array<any>;
  formData: FormGroup;
  editing = false;
  submitted = false;
  activeEntry: any;
  activeUser: any;
  tempBranchList = [];
  // activeUser: any;
  dataFetched = false;

  branchData: any;
  supervisor: [];
  supervisorSelectDropdown: IDropdownSettings;
  selectedSupervisor = [];
  constructor(
    private utils: UtilsService,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private leadService: LeadService,

  ) {
  }

  ngOnInit() {
    this.list();
    this.initialiseForm();
   
    this.getActiveUserData();
   
  }

  initialiseForm() {
    this.formData = this.formBuilder.group({
      name: ['', [Validators.required, Validators.pattern(this.utils.validations.generic)]],
      email: ['', [Validators.required, Validators.email]],
      mobile: ['', [Validators.required, Validators.pattern(this.utils.validations.mobile)]],
      branchId: ['', [Validators.required]],
      roleId: ['', [Validators.required]],
      companyId: ['', [Validators.required]],
      // badminId: ['',[]],
      supervisorId: ['', []],

      password: [''],

      password_confirmation: [''],
      isActive: [true],
      updatePassword: [true],
    }, { validator: this.checkPasswords });
  }


  checkPasswords(group: FormGroup) { // here we have the 'passwords' group
    if (group.get('updatePassword').value) {
      group.controls.password.setValidators([Validators.required, Validators.minLength(5), Validators.maxLength(10)]);
      const pass = group.get('password').value;
      const confirmPass = group.get('password_confirmation').value;
      return pass === confirmPass ? null : { notSame: true };
    } else {
      group.controls.password.setValidators([]);
      return null;
    }
  }

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
    this.formData.patchValue({
      updatePassword: false
    });
    this.activeEntry = entry;
    this.editing = true;
    const obj = {};
    for (const key in this.f) {
      if (this.f.hasOwnProperty(key)) {
        obj[key] = this.activeEntry[key] || '';
        if (key === 'roleId') {
          obj[key] = this.activeEntry[key]._id || '';
        }
        if (key === 'branchId') {
          obj[key] = this.activeEntry[key]._id || '';
        }
        if (key === 'companyId') {
          console.log('changin branch in companyId', this.activeEntry.branchId);
          this.populateBranchDropdown({ target: { value: this.activeEntry[key] } }, this.activeEntry.branchId);
          console.log('changin branch in companyId', this.activeEntry.branchId);
        }
      }
    }

    this.formData.setValue(obj);
    Utils.gotoTop();

  }

  async list() {
    this.data = await this.userService.list();
    this.dataFetched = true;
    this.utils.reInitialiseDataTable('dataTable', '');
    this.getRequiredLists();
   


  }
  getSupervisorName() {

  }
  async getRequiredLists() {
    await this.getCompanyList();
    await this.getRoleList();
    await this.getBranchList();
    // await this.getBranchUserList();
    this.populateFormSelectBox();
    this.getSTLList();

    console.log("b", this.branchList);

  }

  getActiveUserData() {
    this.activeUser = JSON.parse(localStorage.getItem('userData'));
    console.log('this.activeUser', this.activeUser.role.code);
  }

  async getBranchList() {
    this.branchList = await this.userService.getBranchesList();
  }

  async getSTLList() {
    this.reset();
    const branchData = await this.leadService.getBranchData("5dcd033a38014635646adde2");
    this.supervisorList = branchData.stl;
    console.log("sup", this.supervisorList);

    this.data = _.map(this.data, (item) => {
      item.supervisorName = '';
      _.map(this.supervisorList, (supervisor) => {
        console.log('sid', item.supervisorId);

        item.supervisorId.forEach(element => {

          console.log('element', element)

          if (supervisor.id === element) {
            console.log('addname', item.supervisorId)
            item.supervisorName += supervisor.name + ", ";

            // lead[userRoleName] = user.name ;
          }
        });


        //item.supervisorName = item.supervisorName.replace(/,\s*$/, '');
      });
      item.supervisorName = item.supervisorName.substring(0, item.supervisorName.length - 2);
      return item;
    });

    console.log('result', this.data);
  }

  async changeBranch(e, isId = false) {
    const id = isId ? e : e.target.value;
    console.log(id);
    const branchData = await this.leadService.getBranchData(id);
    console.log(branchData.stl)
    this.supervisorList = branchData.stl;
    setTimeout(() => {
      // @ts-ignore
      window.jQuery('#supervisorId_select_picker').selectpicker('refresh');
    }, 500);
  }

  async getCompanyList() {
    this.companyList = await this.userService.getCompaniesList();
  }

  async getRoleList() {
    this.roleList = await this.userService.getRoleList();
  }

  populateFormSelectBox() {
    // get branch name
    this.data = _.map(this.data, (item) => {
      _.map(this.branchList, (branch) => {
        if (branch.id === item.branchId) {
          item.branchName = branch.name;
        }
      });
      return item;
    });

    // get company name

    this.data = _.map(this.data, (item) => {
      _.map(this.companyList, (company) => {
        if (company.id === item.companyId) {
          item.companyName = company.name;
        }
      });
      return item;
    });
    this.companyList = this.companyList.filter((x) => {
      return x.isActive === true;
    });
  }

  // get role name
  // populateRoleSelectBox() {
  //   console.log('xxxx',this.data, this.roleList);
  // this.data = _.map(this.data, (item) => {
  //   _.map(this.roleList, (role) => {
  //     if (role.id === item.roleId) {
  //       item.roleId.name = role.name;
  //     }
  //   });
  //   return item;
  // });
  // }




  async submit() {
    console.log(this.formData);
    this.submitted = true;
    if (this.formData.invalid) {
      return;
    }
    let success = false;

    const data = this.formData.value;
    if (this.editing) {
      success = await this.userService.update(this.activeEntry.id, this.formData.value);
    } else {
      success = await this.userService.create(this.formData.value);
    }

    if (success) {
      this.list();
      this.reset();
      this.initialiseForm();
    }

  }

  async delete() {
    const success = await this.userService.delete(this.activeEntry.id);
    if (success) {
      this.list();
    }
    this.reset();
    this.initialiseForm();
  }

  reset() {
    
    this.editing = false;
    this.submitted = false;
    this.formData.reset();
    this.activeEntry = {};
    this.initialiseForm();
    
    // @ts-ignore
    window.jQuery('#supervisorId_select_picker').selectpicker('val', []);
    setTimeout(() => {
      // @ts-ignore
      window.jQuery('#supervisorId_select_picker').selectpicker('refresh');
    }, 500);
  }

  async changeUserStatus(id) {
    this.activeEntry.isActive = !this.activeEntry.isActive;
    const response = await this.userService.editUser(this.activeEntry, this.activeEntry.id);
    // @ts-ignore
    window.hideBootStrapModal(id);
  }

  populateBranchDropdown(e, branchId = null) {
    const companyId = e.target.value;
    this.tempBranchList = this.branchList.filter((branch) => {
      return branch.companyId === companyId;
    });
    if (branchId) {
      setTimeout(() => {
        this.formData.patchValue({
          branchId
        });
      }, 500);
    }
    return;
  }
}


