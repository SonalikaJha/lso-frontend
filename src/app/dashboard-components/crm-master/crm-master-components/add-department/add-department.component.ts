import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-add-department',
  templateUrl: './add-department.component.html',
  styleUrls: ['./add-department.component.scss']
})
export class AddDepartmentComponent implements OnInit {
  submitted = false;
  addDepartment: FormGroup;

  constructor(private formBuilder: FormBuilder, private toastr: ToastrService) {
  }

  ngOnInit() {
    this.addDepartment = this.formBuilder.group({
      departmentName: ['', [Validators.required, Validators.pattern('^[A-Za-z\'.)( ]+$')]],
      description: ['', [Validators.pattern('^[A-Za-z0-9)(&|+\\-,!@.\\\\/\':? ]+$')]]
    });
    // @ts-ignore
    window.InitialiseDataTable('addDepartmentDataTable');
  }
  get f() {
    return this.addDepartment.controls;
  }

  onSubmit() {
    this.submitted = true;
   
    // stop here if form is invalid
    if (this.addDepartment.invalid) {
      return;
    }
    this.toastr.success('Form submitted Successfully!', '');
    // display form values on success
    // alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.addDepartment.value, null, 4));
  }

  onReset() {
    this.submitted = false;
    this.addDepartment.reset();
  }
}
