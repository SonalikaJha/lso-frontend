import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-add-client-type',
  templateUrl: './add-client-type.component.html',
  styleUrls: ['./add-client-type.component.scss']
})
export class AddClientTypeComponent implements OnInit {
  submitted = false;
  addClientType: any;

  constructor(private formBuilder: FormBuilder, private toastr: ToastrService) {
  }

  ngOnInit() {
    this.addClientType = this.formBuilder.group({
      clientTypeName: ['', [Validators.required, Validators.pattern('^[A-Za-z\'.)( ]+$')]],
      description: ['', [Validators.pattern('^[A-Za-z\'.)( ]+$')]]
    });
    // @ts-ignore
    window.InitialiseAddClientTypeDataTable('addClientTypeDataTable');
  }

  get f() {
    return this.addClientType.controls;
  }

  onSubmit() {
    this.submitted = true;
  

    // stop here if form is invalid
    if (this.addClientType.invalid) {
      return;
    }
    this.toastr.success('Form submitted Successfully!', '');
    // display form values on success
    // alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.addDepartment.value, null, 4));
   
  }
  onReset() {
    this.submitted = false;
    this.addClientType.reset();
  }
}
