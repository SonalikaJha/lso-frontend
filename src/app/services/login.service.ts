import {Injectable} from '@angular/core';
import axios from 'axios';
import {environment} from '../../environments/environment';
import {ToastrService} from 'ngx-toastr';
import Config from '../../assets/js/config';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private router: Router,
    private toastr: ToastrService
  ) {}

  async hitLoginApi(data) {
    try {
      const request = {
        url: Config.baseUrl + 'api/v1/login',
        method: 'post',
        data
      };
      // @ts-ignore
      const response = await axios(request);
      if (response.status === 200) {
        return response.data.data;
      } else {
        return response;
      }
    } catch (e) {
      
      this.toastr.error(e.response.data.message, '');
      return '';
    }
  }

  checkLoginStatus() {
    const userData = localStorage.getItem('userData');
    if (userData !== null) {
      this.router.navigate(['/dashboard']);
    } else {
      this.router.navigate(['/login']);
    }
  }

}
