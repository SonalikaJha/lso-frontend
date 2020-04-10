import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-clouser',
  templateUrl: './clouser.component.html',
  styleUrls: ['./clouser.component.scss']
})
export class ClouserComponent implements OnInit {
  submitted = false;
  clouser: FormGroup;
  mobile = [''];
  followUp = [''];
  areDealerOptionsVisible = true;
  formData: {
    stl: any;
  };
  welcomeCall: Boolean;
  
  constructor(private formBuilder: FormBuilder, private toastr: ToastrService) { }

  ngOnInit() {
    
    this.clouser = this.formBuilder.group({
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
      followUp1: [''],
      landline: [''],
      email: [''],
      pipeline: [''],
      property: [''],
      location: [''],
      Sector: [''],
      carpetArea: [''],
      superArea: [''],
      furnishing: [''],
      sale: [''],
      lease: [''],
      remarks: [''],
      
     
    });
  }
  get f() {
    return this.clouser.controls;
  }

  onSubmit() {
    this.submitted = true;
 

    // stop here if form is invalid
    if (this.clouser.invalid) {
      return;
    }
    this.toastr.success('Form submitted Successfully!', '');
    // display form values on success
    // alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.addLead.value, null, 4));
  }

  onReset() {
    this.submitted = false;
    this.clouser.reset();
  }

  changeDealerOptionsVisibility(value) {
    this.areDealerOptionsVisible = value !== 'dst';
   
  }

  addFollowUp() {
    this.clouser.addControl('followUp' + (this.followUp.length + 1), this.formBuilder.control('', Validators.required));
    this.followUp.push('');
  }
  addMobile() {
    this.clouser.addControl('mobile' + (this.mobile.length + 1), this.formBuilder.control('', Validators.required));
    this.mobile.push('');
  }
}

  
