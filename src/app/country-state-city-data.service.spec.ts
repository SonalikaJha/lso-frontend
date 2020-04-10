import { TestBed } from '@angular/core/testing';

import { CountryStateCityDataService } from './country-state-city-data.service';

describe('CountryStateCityDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CountryStateCityDataService = TestBed.get(CountryStateCityDataService);
    expect(service).toBeTruthy();
  });
});
