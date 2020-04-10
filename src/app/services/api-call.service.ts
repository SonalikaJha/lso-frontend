import {Injectable} from '@angular/core';
import axios from 'axios';
import Config from '../../assets/js/config';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ApiCallService {

  constructor(private toastr: ToastrService,
              private router: Router) {
  }

  static addBaseUrl(request) {
    request.url = Config.baseUrl + request.apiEndPoint;
    delete request.apiEndPoint;
    return request;
  }

  static addAuthorizationToken(request) {
    if (request.Authorization) {
      request.headers = {
        Authorization: 'Bearer ' + JSON.parse(localStorage.getItem(Config.localStorageKeys.userData)).token
      };
      delete request.Authorization;
    }
    return request;
  }

  async hitApi(request) {
    try {
      request = ApiCallService.addBaseUrl(request);
      request = ApiCallService.addAuthorizationToken(request);
      // @ts-ignore
      return await axios(request);
    } catch (e) {
      if (e.response.status === 401) {
        localStorage.clear();
        await this.router.navigate(['/login']);
      } else if (e.response.status === 403) {
        this.toastr.error('Please try after some time');
      }
      this.toastr.error(e.response.data.message, '');
     
      if (e.response.data.errors.length > 0) {
        // _.map(e.response.data.errors, (error) => {
        //   this.toastr.success('Form submitted Successfully!', '');
      }
      // });
      return e.response;
    }
  }

  async getBranchList() {
    const request = {
      apiEndPoint: Config.url.branchesList,
      method: 'get',
      Authorization: true
    };
    return await this.hitApi(request);
  }

  async getLeadSourceList() {
    const request = {
      apiEndPoint: Config.url.leadSourceList,
      method: 'get',
      Authorization: true
    };

    return await this.hitApi(request);
  }
}
