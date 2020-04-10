import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';  


@Component({
  selector: 'app-dwr',
  templateUrl: './dwr.component.html',
  styleUrls: ['./dwr.component.scss']
})
export class DwrComponent implements OnInit {
  submitted = false;
  dwr: FormGroup;
  mobile = [''];
  followUp = [''];
  areDealerOptionsVisible = true;
  formData: {
    stl: any;
  };
  welcomeCall: Boolean;

  constructor(private formBuilder: FormBuilder, private toastr: ToastrService) { }

  ngOnInit() {
    this.dwr = this.formBuilder.group({
      date: ['', Validators.required],
      branch: ['', Validators.required],
      source: ['', Validators.required],
      dstcpt: ['', Validators.required],
      salesModel: ['', Validators.required],
      stl: ['', Validators.required],
      sm: ['', Validators.required],
      sttc: ['', Validators.required],
      dtl: ['', Validators.required],
      dta: ['', Validators.required],
      da: ['', Validators.required],
      clientName: ['', Validators.required],
      welcomeCall: ['', Validators.required],
      description: ['', [Validators.required, Validators.pattern('^[A-Za-z0-9)(&|+\\-,!@.\\\\/\':? ]+$')]],
      followUp1: ['']
     
    });
  }
  get f() {
    return this.dwr.controls;
  }

  onSubmit() {
    this.submitted = true;
   
    // stop here if form is invalid
    if (this.dwr.invalid) {
      return;
    }
    this.toastr.success('Form submitted Successfully!', '');
    // display form values on success
    // alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.dwr.value, null, 4));
  }

  onReset() {
    this.submitted = false;
    this.dwr.reset();
  }

  changeDealerOptionsVisibility(value) {
    this.areDealerOptionsVisible = value !== 'dst';
    
  }

  addFollowUp() {
    this.dwr.addControl('followUp' + (this.followUp.length + 1), this.formBuilder.control('', Validators.required));
    this.followUp.push('');
  }
  addMobile() {
    this.dwr.addControl('mobile' + (this.mobile.length + 1), this.formBuilder.control('', Validators.required));
    this.mobile.push('');
  }
}

  
