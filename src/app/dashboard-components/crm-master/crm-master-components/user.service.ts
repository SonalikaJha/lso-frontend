import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ApiCallService } from './../../../services/api-call.service'
import Config from './../../../../assets/js/config';
import {UtilsService} from './../../../utils/utils.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private utilsService: UtilsService,
    private apiService: ApiCallService,
    private toastr: ToastrService,) { }

    async list() {
      const request = {
        apiEndPoint: Config.url.userList,
        method: 'get',
        Authorization: true
      };

      const response = await this.apiService.hitApi(request);

      if (response.status === 200) {
        return response.data.data;
      } else {
        this.toastr.error(response.data.message || 'Internal Server Error');
        return [];
      }
    }

    async getBranchesList() {
      const request = {
        apiEndPoint: Config.url.branchesList,
        method: 'get',
        Authorization: true
      };
    
      const response = await this.apiService.hitApi(request);
     
      // if (response.data.message) {
      //   this.toastr.success(response.data.message, '');
      // }
      return response.data.data;
    }
    async getCompaniesList() {
      const request = {
        apiEndPoint: Config.url.company,
        method: 'get',
        Authorization: true
      };
   
      const response = await this.apiService.hitApi(request);
      
      // if (response.data.message) {
      //   this.toastr.success(response.data.message, '');
      // }
      return response.data.data;
    }


    async getRoleList() {
      const request = {
        apiEndPoint: Config.url.roleList,
        method: 'get',
        Authorization: true
      };
      const response = await this.apiService.hitApi(request);
      if (response.status === 200) {
        return response.data.data;
      } else {
        this.toastr.error(response.data.message || 'Internal Server Error');
        return [];
      }
    }
    // async getBranchesUserList() {
    //   const request = {
    //     apiEndPoint: Config.url.branchUserList,
    //     method: 'get',
    //     Authorization: true
    //   };
    //   const response = await this.apiService.hitApi(request);
    //   if (response.status === 200) {
    //     return response.data.data;
    //   } else {
    //     this.toastr.error(response.data.message || 'Internal Server Error');
    //     return [];
    //   }
    // }
    

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

    async create(data) {
      return this.hitRequest('post', null, data);
    }

    async update(id, data) {
      return this.hitRequest('post', id, data);
    }

  async editUser(data, id) {
    const request = {
      apiEndPoint: Config.url.editUser.replace('{id}', id),
      method: 'post',
      Authorization: true,
      data
    };
    const response = await this.apiService.hitApi(request);
    if (response.data.message) {
      this.toastr.success(response.data.message, '');
    }
    if(response.status !== 200) {
      this.toastValidationErrors(response.data.errors);
    }
    return response;
  }

    async delete(id) {
      return this.hitRequest('delete', id);
    }

    private async hitRequest(method, id = null, data = {}) {
      const request = {
        apiEndPoint: id ? Config.url.userList + '/' + id : Config.url.userList,
        method,
        Authorization: true,
        data
      };
      const response = await this.apiService.hitApi(request);

      if (response.status === 200) {
        this.toastr.success(response.data.message);
        return true;
      } else {
        this.toastValidationErrors(response.data.errors);
        this.toastr.error(response.data.message);
        return false;
      }
    }
   

    // async getBranchData(branchId= '') {
      
    //   const request = {
    //     method: 'get',
    //     apiEndPoint: 'api/v1/branch-user/' + branchId,
    //     Authorization: true
    //   };
    //   const response = await this.apiService.hitApi(request);
      
        
    //   };
    }
  
    
   
  


