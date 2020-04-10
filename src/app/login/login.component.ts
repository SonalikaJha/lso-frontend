import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';
import {LoginService} from '../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;
  loginButtonText = 'Login';

  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
    private loginService: LoginService
  ) {
  }

  ngOnInit() {
    this.initialiseForm();
    this.loginService.checkLoginStatus();
  }
  initialiseForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  async onLoginFormSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    this.loginButtonText = 'Logging in ... <i class="fa fa-spinner fa-spin"></i>';
    const response = await this.loginService.hitLoginApi(this.loginForm.value);
   
    if (response === '') {
      this.loginButtonText = 'Log in';
    } else {
      localStorage.setItem('userData', JSON.stringify(response));
      this.router.navigate(['/dashboard']).then(r => {
        this.toastr.success('Logged in Successfully!', '');
      });
    }
  }
}
