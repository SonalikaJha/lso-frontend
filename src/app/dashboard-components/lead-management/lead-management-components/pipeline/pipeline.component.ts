import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormArray} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import * as moment from 'moment';
@Component({
  selector: 'app-pipeline',
  templateUrl: './pipeline.component.html',
  styleUrls: ['./pipeline.component.scss']
})
export class PipelineComponent implements OnInit {
  minDate = new Date(moment().subtract(2, 'days').format('ll'));
  maxDate = new Date(moment().add(2, 'days').format('ll'));
  today = new Date();
  submitted = false;
  formData: FormGroup;
  mobile = [''];
  meetings: FormArray;
  // areDealerOptionsVisible = true;
  // private minDate = new Date(moment().subtract(2, 'days').format('ll'));
  // private maxDate = new Date(moment().add(2, 'days').format('ll'));

  constructor(private formBuilder: FormBuilder, private toastr: ToastrService) { }

  ngOnInit() {
    this.initialiseForm();
  }
  initialiseForm() {
    this.formData = this.formBuilder.group({
      // Team Information
      date: [''],
      branch: [''],
      source: [''],
      dstcpt: [''],
      salesModel: [''],
      stl: [''],
      sm: [''],
      sttc: [''],
      dtl: [''],
      da: [''],
      // Project Requirement
      location: [''],
      sector: [''],
      project: [''],
      area: [''],
      budget: [''],
      requirement: [''],
      carpetArea: [''],
      superArea: [''],
      inventory: [''],
      // Customer Details
      clientName: ['', [Validators.required]],
      landline: ['', Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$')],
      email: ['', [Validators.email, Validators.required]],
      mobile: ['', Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$')],
      // Meeeting

      // meetingDoneBy: [''],
      // remarks: [''],
      meetings: this.formBuilder.array([this.addMeetings()])

    });
  }
  get meeting()
  {
    return this.formData.get('meetings') as FormArray
  }
  addMeetings(): FormGroup{
    return this.formBuilder.group({
      meetingDoneBy: [],
      remarks: []
    });
  }
  addNewMeeting()
  {

    this.meetings = this.formData.get('meetings') as FormArray;
    this.meetings.push (this.addMeetings());
  }

  get f() {
    return this.formData.controls;
  }

  onSubmit() {
    this.submitted = true;
 
    // stop here if form is invalid
    if (this.formData.invalid) {
      return;
    }
    this.toastr.success('Form submitted Successfully!', '');
    // display form values on success
    // alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.dwr.value, null, 4));
  }

  onReset() {
    this.submitted = false;
    this.formData.reset();
  }

  // changeDealerOptionsVisibility(value) {
  //   this.areDealerOptionsVisible = value !== 'dst';
  //   console.log('jh', value);
  // }

  addMobile() {
    this.formData.addControl('mobile' + (this.mobile.length + 1), this.formBuilder.control('', Validators.required));
    this.mobile.push('');
  }
  // addMeetings() {
  //   this.formData.addControl('meeting' + (this.addMeeting.length + 1), this.formBuilder.control('', Validators.required));
  //   this.addMeeting.push('');

}





