import {Injectable} from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {ApiCallService} from './api-call.service';
import Config from '../../assets/js/config';
import {UtilsService} from '../utils/utils.service';


@Injectable({
  providedIn: 'root'
})
export class SalesModelService {

  constructor(
    private toastr: ToastrService,
    private utilsService: UtilsService,
    private apiCallService: ApiCallService
  ) {}

  async getSalesModelsList() {
    const request = {
      apiEndPoint: Config.url.listSalesModel,
      method: 'get',
      Authorization: true
    };
    return this.utilsService.checkApiResponse(await this.apiCallService.hitApi(request));
  }

  async addSalesModel(data) {
    const request = {
      apiEndPoint: Config.url.createSalesModel,
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
  async editSalesModel(data, id) {
    const request = {
      apiEndPoint: Config.url.editSalesModel.replace('{id}', id),
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
  //   if (response.data.message) {
  //     this.toastr.success(response.data.message, '');
  //   }
  //   return response.data.data;
  // }

  async deleteSalesModel(id) {
  
    const request = {
      apiEndPoint: Config.url.deleteSalesModel.replace('{id}', id),
      method: 'delete',
      Authorization: true
    };
    const response = await this.apiCallService.hitApi(request);
    if (response.data.message) {
    this.toastr.success(response.data.message, '');
    }
    return response.data.data;
  }
}
