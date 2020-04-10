import {Injectable} from '@angular/core';
import {ApiCallService} from './services/api-call.service';
import Config from '../assets/js/config';
import _ from 'underscore';

@Injectable({
  providedIn: 'root'
})
export class CountryStateCityDataService {
  countryStateCityData = [];

  constructor(private apiCallService: ApiCallService) {
  }

  async getStatesCityData() {
    return await this.checkCountryStateCityData();
  }

  async checkCountryStateCityData() {
    if (this.countryStateCityData.length === 0) {
      const request = {
        apiEndPoint: Config.url.countryStateCity,
        method: 'get',
        Authorization: true
      };
      const response = await this.apiCallService.hitApi(request);
      this.countryStateCityData = response.data.data;
      return this.countryStateCityData;
    } else {
      return this.countryStateCityData;
    }
  }

  async getCountryNameFromArray(countryId) {
    await this.checkCountryStateCityData();
    let countryName;
    _.map(this.countryStateCityData, (country) => {
      if (country._id === countryId) {
        countryName = country.name;
        return ;
      } else {
        return '';
      }
    });
    return countryName;
  }

  updateCountryStateCityData(companyTableData, countryStateCityArray) {
    return _.map(companyTableData, (companyData) => {
      _.map(countryStateCityArray, (country) => {
        if (companyData.countryId === country._id) {
          companyData.countryName = country.name;
          _.map(country.states, (state) => {
            if (companyData.stateId === state._id) {
              companyData.stateName = state.name;
              _.map(state.cities, (city) => {
                if (companyData.cityId === city._id) {
                  companyData.cityName = city.name;
                }
              });
            }
          });
        }
      });
      return companyData;
    });
  }

  populateStateDropdown(countryStateCityArray, countryId) {
    let stateArray = [];
    _.map(countryStateCityArray, (country) => {
      if (countryId === country._id) {
        stateArray = country.states;
      }
    });
    return _.sortBy(stateArray, 'name');
  }

  populateCityDropdown(stateArray, stateId) {
    let cityArray = [];
    _.map(stateArray, (state) => {
      if (stateId === state._id) {
        cityArray = state.cities;
      }
    });
    return _.sortBy(cityArray, 'name');
  }
}
