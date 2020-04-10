import { Component, OnInit } from '@angular/core';
import {CountryStateCityDataService} from '../country-state-city-data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard-layout.component.html',
  styleUrls: ['./dashboard-layout.component.scss']
})
export class DashboardLayoutComponent implements OnInit {
  isScrollButtonVisible = true;

  constructor(private countryStateCityData: CountryStateCityDataService) { }

  ngOnInit() {
    this.fetchCountryStateCityData();
  }

  async fetchCountryStateCityData() {
    const data = await this.countryStateCityData.getStatesCityData();
   
  }
}
