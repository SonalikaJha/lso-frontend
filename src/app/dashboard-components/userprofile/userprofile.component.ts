import { UserServiceService } from './user-service.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.scss']
})
export class UserprofileComponent implements OnInit {
  submitted = false;
  formData: FormGroup;
  editingData: boolean;
  userProfile: any;
  updatePassword = false;

  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private userService: UserServiceService) { }

  ngOnInit() {
    this.formData = this.formBuilder.group({
      name: ['', Validators.required],
      mobile: ['', [Validators.pattern(/^\d{10}$/)]],
      old_password: [''],
      new_password: [''],
      new_password_confirmation: ['']

    });
    this.getData();
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
   
    this.updateData();
  }

  onReset() {
    this.submitted = false;
    this.formData.reset();
    this.getData();
  }

  async getData() {
    this.userProfile = await this.userService.getData();
    this.formData.setValue({
      name: this.userProfile.name,
      old_password: '',
      new_password: '',
      new_password_confirmation: '',
      mobile: this.userProfile.mobile,
    });
  }

  async updateData() {
    let data = this.formData.value;
    if (!data.old_password) {
      data = {
        name: this.f.name.value,
        mobile: this.f.mobile.value,
      };
    } else {
      if (!data.new_password) {
        return this.toastr.error('New password cannot be empty!');
      }
      if (data.new_password !== data.new_password_confirmation) {
        return this.toastr.error('New password does not match New password Confirmation!');
      }
    }
    const response = await this.userService.updateData(data);
    if ('message' in response.data) {
      if (response.status === 200) {
        this.toastr.success(response.data.message);
        this.submitted = false;
        this.editingData = false;
        this.formData.reset();
        this.getData();
      } else {
        for (const key in response.data.errors) {
          if (response.data.errors.hasOwnProperty(key)) {
            response.data.errors[key].forEach(error => {
              this.toastr.error(error);
            });
          }
        }
        this.toastr.error(response.data.message);
      }
    }
  }

}
