import {ApiCallService} from './api-call.service';
import {ToastrService} from 'ngx-toastr';
import {Injectable} from '@angular/core';
import Config from '../../assets/js/config';
import {UtilsService} from '../utils/utils.service';

@Injectable({
  providedIn: 'root'
})
export class LeadSourceService {

  constructor(
    private toastr: ToastrService,
    private utilsService: UtilsService,
    private apiCallService: ApiCallService
  ) {
  }

  async getLeadSourceList() {
    const request = {
      apiEndPoint: Config.url.leadSource,
      method: 'get',
      Authorization: true
    };
    return this.utilsService.checkApiResponse(await this.apiCallService.hitApi(request));
  }

  async hitAddLeadSourceApi(data) {
    const request = {
      apiEndPoint: Config.url.leadSource,
      method: 'post',
      Authorization: true,
      data
    };
    const response = await this.apiCallService.hitApi(request);
    if (response.data.message) {
      this.toastr.success(response.data.message, '');
    }
    return response.data.data;
  }

  toastValidationErrors(errors) {
    // const bucket = [];
    for (const key in errors) {
      if (errors.hasOwnProperty(key)) {
        errors[key].forEach(error => {
          this.toastr.error(error);
        });
      }
    }
  }
  async editLeadSource(data, id: string) {
    const request = {
      apiEndPoint: Config.url.leadSource + '/' + id,
      method: 'post',
      Authorization: true,
      data
    };
    const response = await this.apiCallService.hitApi(request);
  if (response.data.message) {
    this.toastr.success(response.data.message, '');
  }
  if(response.status !== 200) {
    this.toastValidationErrors(response.data.errors);
  }
  return response;
}
  //   const response = await this.apiCallService.hitApi(request);
  //   console.log('response', response);
  //   if (response.status) {
  //     this.toastr.success(response.data.message, '');
  //   }
  //   return response.data.data;
  // }

  async deleteData(id: string) {
    const request = {
      apiEndPoint: Config.url.leadSource + '/' + id,
      method: 'delete',
      Authorization: true,
    };

    const response = await this.apiCallService.hitApi(request);
    if (response.status) {
      this.toastr.success(response.data.message, '');
    }
    return response.data.data;
  }
}
