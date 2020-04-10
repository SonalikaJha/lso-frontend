import {Injectable} from '@angular/core';
import Config from '../../assets/js/config';
import {ToastrService} from 'ngx-toastr';
import {ApiCallService} from './api-call.service';

@Injectable({
  providedIn: 'root'
})
export class LeadTypeService {

  constructor(
    private toastr: ToastrService,
    private apiCallService: ApiCallService
  ) {
  }

  async getLeadTypeList() {
    const request = {
      apiEndPoint: Config.url.leadTypeList,
      method: 'get',
      Authorization: true
    };
    const response = await this.apiCallService.hitApi(request);
    // if (response.data.message) {
    //   this.toastr.success(response.data.message, '');
    // }
    return response.data.data;
  }

  async addLeadType(data) {
    const request = {
      apiEndPoint: Config.url.createLeadType,
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

  async editLeadType(data, id) {
    const request = {
      apiEndPoint: Config.url.editLeadType.replace('{id}', id),
      method: 'post',
      Authorization: true,
      data
    };
  //   const response = await this.apiCallService.hitApi(request);
  //   if (response.data.message) {
  //     this.toastr.success(response.data.message, '');
  //   }
  //   return response.data.data;
  // }
  const response = await this.apiCallService.hitApi(request);
  if (response.data.message) {
    this.toastr.success(response.data.message, '');
  }
  if(response.status !== 200) {
    this.toastValidationErrors(response.data.errors);
  }
  return response;
}





  async deleteLeadType(id) {
    const request = {
      apiEndPoint: Config.url.editLeadType.replace('{id}', id),
      method: 'delete',
      Authorization: true,
    };
   
    const response = await this.apiCallService.hitApi(request);
    if (response.data.message) {
      this.toastr.success(response.data.message, '');
    }
    return response.data.data;
  }
}
