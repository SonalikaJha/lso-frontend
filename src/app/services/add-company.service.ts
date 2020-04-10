import {Injectable} from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {ApiCallService} from './api-call.service';
import Config from '../../assets/js/config';
import {UtilsService} from '../utils/utils.service';

@Injectable({
  providedIn: 'root'
})
export class AddCompanyService {

  constructor(
    private toastr: ToastrService,
    private apiCallService: ApiCallService,
    private utilsService: UtilsService
  ) {
  }

  async getCompaniesList() {
    const request = {
      apiEndPoint: Config.url.company,
      method: 'get',
      Authorization: true
    };
    return this.utilsService.checkApiResponse(await this.apiCallService.hitApi(request));
  }

  async addCompany(data) {
    const request = {
      apiEndPoint: Config.url.company,
      method: 'post',
      Authorization: true,
      data
    };
    return this.utilsService.checkApiResponse(await this.apiCallService.hitApi(request));
  }

  async editCompany(data, id) {
    const request = {
      apiEndPoint: Config.url.company + '/' + id,
      method: 'post',
      Authorization: true,
      data
    };
    return this.utilsService.checkApiResponse(await this.apiCallService.hitApi(request));
  }

  async deleteCompany(id) {
    const request = {
      apiEndPoint: Config.url.company + '/' + id,
      method: 'delete',
      Authorization: true
    };
    return this.utilsService.checkApiResponse(await this.apiCallService.hitApi(request));
  }
}
