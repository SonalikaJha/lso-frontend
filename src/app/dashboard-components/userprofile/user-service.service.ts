import { ToastrService } from 'ngx-toastr';
import { ApiCallService } from '../../services/api-call.service';
import { Injectable } from '@angular/core';
import config from '../../../assets/js/config';
@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  constructor(
    private toastr: ToastrService,
    private apiCallService: ApiCallService
  ) { }

  async getData() {
    const request = {
      apiEndPoint: config.url.userProfile,
      method: 'get',
      Authorization: true
    };

    const response = await this.apiCallService.hitApi(request);
    return response.data.user;
  }

  async updateData(data) {
    const request = {
      apiEndPoint: config.url.userProfile,
      method: 'post',
      Authorization: true,
      data
    };

    const response = await this.apiCallService.hitApi(request);

    return response;
  }
}
