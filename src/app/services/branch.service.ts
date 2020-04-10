import {Injectable} from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {ApiCallService} from './api-call.service';
import Config from '../../assets/js/config';
import {UtilsService} from '../utils/utils.service';

@Injectable({
  providedIn: 'root'
})
export class BranchService {

  constructor(
    private toastr: ToastrService,
    private utilsService: UtilsService,
    private apiCallService: ApiCallService
  ) {
  }

  async getBranchesList() {
    const request = {
      apiEndPoint: Config.url.branchesList,
      method: 'get',
      Authorization: true
    };
    return this.utilsService.checkApiResponse(await this.apiCallService.hitApi(request));
  }

  async addBranch(data) {
    const request = {
      apiEndPoint: Config.url.createBranch,
      method: 'post',
      Authorization: true,
      data
    };
    const response = await this.apiCallService.hitApi(request);
    if (response.data.message) {
      this.toastr.success(response.data.message, '');
    }
    return response;
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

  async editBranch(data, id) {
    const request = {
      apiEndPoint: Config.url.editBranch.replace('{id}', id),
      method: 'post',
      Authorization: true,
      data
    };
    const response = await this.apiCallService.hitApi(request);
    if (response.data.message) {
      this.toastr.success(response.data.message, '');
    }
    if (response.status !== 200) {
      this.toastValidationErrors(response.data.errors);
    }
    return response;
  }

  async deleteBranch(branchId) {
    const request = {
      apiEndPoint: Config.url.deleteBranch.replace('{id}', branchId),
      method: 'delete',
      Authorization: true
    };
    const response = await this.apiCallService.hitApi(request);
    if (response.data.message) {
      this.toastr.success(response.data.message, '');
    }
    return response;

  }
}
