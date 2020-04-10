import {Component, OnInit} from '@angular/core';
import { FormBuilder, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {LeadSourceService} from '../../../../services/lead-source.service';
import {UtilsService} from '../../../../utils/utils.service';


@Component({
  selector: 'app-add-lead-source',
  templateUrl: './add-lead-source.component.html',
  styleUrls: ['./add-lead-source.component.scss']
})
export class AddLeadSourceComponent implements OnInit {
  submitted = false;
  addLeadSource: any;
  activeLeadSource: any;
  leadSourceTableData = [];
  leadSourceTableDataFetched= false;
  editingLeadSource= false;

  constructor(
    private utils: UtilsService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private leadSourceService: LeadSourceService,
  ) {
  }

  ngOnInit() {
    this.getLeadSourceList();
    this.initialiseForm();
  }
  uniqueCodeValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      let isUniqueCode = [false];
      const companyData = this.addLeadSource;
      if (companyData != null && !this.editingLeadSource) {
        this.leadSourceTableData.map(
          (data) => {
            if (data['code'] === control.value) {
              isUniqueCode.push(true);
            }
          }
        );

      }
      if (this.editingLeadSource) {
        this.leadSourceTableData.map(
          (data) => {
            if (data['code'] === control.value) {
              if(control.value != this.activeLeadSource['code'] ) {
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
    this.addLeadSource = this.formBuilder.group({
      name: ['',  [Validators.required, Validators.pattern(this.utils.validations.generic)]],
      // code: ['', [Validators.required , Validators.pattern(this.utils.validations.code)]],
      code: ['', [Validators.required, Validators.pattern(this.utils.validations.code), this.uniqueCodeValidator()]],
      description: ['',  [ Validators.pattern(this.utils.validations.generic)]],
      isActive: [true]
    });
    // this.addLeadSource.setValue({
     
    // });
  }

  get f() {
    return this.addLeadSource.controls;
  }

  async checkLoginCredentials() {
    // const testString = await this.leadSourceService.hitAddLeadSourceApi();
    // console.log('string', testString);
  }

  onSubmit() {
    this.submitted = true;
  
    if (this.addLeadSource.invalid) {
      return;
    }
    if (this.activeLeadSource) {
      this.updateLeadSource();
    } else {
      this.addNewLeadSource();
    }
      
    // this.toastr.success('Form submitted Successfully!', '');
  }
  resetFormAndRefreshList() {
    this.onReset();
    this.getLeadSourceList();
  }



  onReset() {
    this.submitted = false;
    this.addLeadSource.reset();
    this.activeLeadSource = false;
    this.activeLeadSource = '';
    this.initialiseForm();
    this.editingLeadSource= false;
  }

  editLeadSource(leadSourceData) {
    this.editingLeadSource= true;
    this.activeLeadSource = leadSourceData;
    this.addLeadSource.setValue({
      name: leadSourceData.name,
      code: leadSourceData.code,
      description: leadSourceData.description,
      isActive: leadSourceData.isActive

    });
  }


  // reinitialiseDataTable() {
  //   // @ts-ignore
  //     window.destroyDataTable('dataTable');
    
  //   const columnsToBeShorted = {
  //     columns: [
  //       {name: 'Name', orderable: true},
  //       {name: 'Code', orderable: true},
  //       {name: 'Description', orderable: false},
  //       {name: 'Status', orderable: true},
  //       {name: 'Actions', orderable: false}
  //     ]
  //   };
  //   setTimeout(() => {
  //     // @ts-ignore
  //     window.InitialiseAddClientTypeDataTable('dataTable', columnsToBeShorted);
  //   }, 1000);
  // }

  async getLeadSourceList() {
    this.leadSourceTableData = await this.leadSourceService.getLeadSourceList();
    this.leadSourceTableDataFetched = true;
    this.utils.reInitialiseDataTable('dataTable', '');
    
  }
  

  async addNewLeadSource() {
    const data = await this.leadSourceService.hitAddLeadSourceApi(this.addLeadSource.value);
    
    this.leadSourceTableData.push(data);
    this.resetFormAndRefreshList();
  }

  async updateLeadSource() {
    const data = await this.leadSourceService.editLeadSource(this.addLeadSource.value, this.activeLeadSource.id);
    
    this.leadSourceTableData.map (
      (leadData)=>{
        if(leadData["id"]==data["id"]){
          leadData = data;
        }
      }
    )
    this.resetFormAndRefreshList()
  }
  async deleteData() {
    const data = await this.leadSourceService.deleteData(this.activeLeadSource.id);
    
    this.getLeadSourceList();
  }

  async changeLeadSourceStatus(id) {
    this.activeLeadSource.isActive = !this.activeLeadSource.isActive;
    const response = await this.leadSourceService.editLeadSource(this.activeLeadSource, this.activeLeadSource.id);
    // @ts-ignore
    window.hideBootStrapModal(id);
    if (typeof response === 'object') {
      // this.toastr.success();

    }
  
  }
}
